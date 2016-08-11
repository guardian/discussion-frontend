const express = require('express');
const path = require('path');
const plugins = require('../rollup.base.config').devPlugins;
const injectReact = require('../rollup.base.config').standalonePluginsExtraReact;
const injectPreact = require('../rollup.base.config').standalonePluginsExtraPreact;
const rollup = require('rollup');
const fs = require('fs');

const app = express();

function rollupMiddleware (base, format, forceInject) {
    return function(req, res, next) {
        if (/\.js$/.test(req.path)) {
            const fullpath = path.join(base, req.path);
            const inject = req.query.framework === 'preact' ? injectPreact : injectReact;
            if (exists(fullpath)) {
                rollup.rollup({
                    entry: fullpath,
                    plugins: /standalone/.test(req.path) || forceInject ? plugins.concat(inject) : plugins
                })
                .then(bundle => bundle.generate({ format: format }))
                .then(result => {
                    res.status(200)
                    .type('application/javascript')
                    .send(result.code);
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

app.use(rollupMiddleware(__dirname, 'iife', true));
app.use('/src', rollupMiddleware(path.join(__dirname, '../src'), 'amd', false));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/assets.json', (req, res) => {
    res.send({
        'discussion-frontend.amd': 'src/index',
        'discussion-frontend.standalone.amd': 'src/standalone'
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
