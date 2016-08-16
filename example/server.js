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

const app = express();

function rollupMiddleware (base, format) {
    const react = (production) => production ? reactProd : reactDev;
    const preact = (production) => production ? preactProd : preactDev;
    const compress = (production) => production ? (code, name) => {
        return uglify.minify({
            [name]: code
        }, {
            fromString: true,
            compress: uglifyOpts
        }).code;
    } : (code) => code;

    return function(req, res, next) {
        if (/\.js$/.test(req.path)) {
            const production = req.query.production === 'false' ? false : true;
            const fullpath = path.join(base, req.path);
            const plugins = req.query.framework === 'preact' ? preact(production) : react(production);

            if (exists(fullpath)) {
                rollup.rollup({
                    entry: fullpath,
                    plugins: plugins
                })
                .then(bundle => bundle.generate({ format: format }))
                .then(result => {
                    res.status(200)
                    .type('application/javascript')
                    .send(compress(production)(result.code, req.path));
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

app.get('/getCommentCounts', (req, res) => {
    res.send(req.query['short-urls'].split(',').reduce((resp, id) => {
        return Object.assign(resp, { [id]: Math.floor(Math.random() * 5000) });
    }, {}));
});

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
