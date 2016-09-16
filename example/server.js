/* eslint-disable camelcase */
const express = require('express');
const fs = require('fs');
const path = require('path');
const reactDev = require('../rollup.base.config').standaloneReactDevelopment;
const preactDev = require('../rollup.base.config').standalonePreactDevelopment;
const reactProd = require('../rollup.base.config').standaloneReactProduction;
const preactProd = require('../rollup.base.config').standalonePreactProduction;
const rollup = require('rollup');
const uglify = require('uglify-js');
const uglifyOpts = require('../uglify.options');
const pkg = require('../package.json');
const mockApi = require('./lib/mocks');

const app = express();

function rollupMiddleware (base, format) {
    const react = (production) => production ? reactProd : reactDev;
    const preact = (production) => production ? preactProd : preactDev;
    const compress = (production) => production ? (bundle, name) => {
        const minified = uglify.minify({
            [name]: bundle.code
        }, {
            fromString: true,
            inSourceMap: JSON.parse(bundle.map.toString()),
            outSourceMap: name + '.map',
            sourceMapIncludeSources: true,
            compress: uglifyOpts
        });
        return minified.code.replace(/\/\/# sourceMappingURL.*$/, inlineSourceMap(minified.map));
    } : (bundle) => bundle.code + '\n' + inlineSourceMap(bundle.map.toString());

    return function(req, res, next) {
        if (/\.js$/.test(req.path)) {
            const production = req.query.production === 'true';
            const fullpath = path.join(base, req.path);
            const plugins = req.query.framework === 'preact' ? preact(production) : react(production);

            if (exists(fullpath)) {
                rollup.rollup({
                    entry: fullpath,
                    plugins: plugins
                })
                .then(bundle => bundle.generate({ format: format, sourceMap: true }))
                .then(result => {
                    res.status(200)
                    .type('application/javascript')
                    .send(compress(production)(result, req.path));
                })
                .catch(next);
            } else {
                next();
            }
        } else {
            next();
        }
    };
}

app.use('/src', rollupMiddleware(path.join(__dirname, '../src'), 'amd'));
app.use(rollupMiddleware(__dirname, 'iife'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/assets-v' + pkg.version + '.dev.json', (req, res) => {
    res.send({
        'riffraff.build.id': 'dev',
        'discussion-frontend.react.amd': 'src/index.js?framework=react&production=false',
        'discussion-frontend.preact.amd': 'src/index.js?framework=preact&production=false',
    });
});
app.get('/assets-v' + pkg.version + '.json', (req, res) => {
    res.send({
        'riffraff.build.id': 'dev',
        'discussion-frontend.react.amd': 'src/index.js?framework=react&production=true',
        'discussion-frontend.preact.amd': 'src/index.js?framework=preact&production=true',
    });
});

app.use('/api', mockApi);
app.use(express.static(__dirname));

var port = process.env.PORT || 4000;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Example ready on http://localhost:' + port);
});

function exists (file) {
    try {
        return fs.statSync(file).isFile();
    } catch (ex) {
        return false;
    }
}

function base64 (string) {
    return new Buffer(string).toString('base64');
}

function inlineSourceMap (map) {
    return '//# sourceMappingURL=data:text/plain;base64,' + base64(map);
}
