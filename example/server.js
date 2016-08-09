const express = require('express');
const path = require('path');
const rollupOpts = require('../rollup.base.config');
const rollup = require('rollup');
const replace = require('rollup-plugin-replace');
const inject = require('rollup-plugin-inject');

const app = express();

app.use((req, res, next) => {
    if (/\.js$/.test(req.path)) {
        const fullpath = path.join(__dirname, req.path);
        rollup.rollup({
            entry: fullpath,
            plugins: rollupOpts.plugins.concat([
                replace({
                    'process.env.NODE_ENV': '\'dev\''
                }),
                inject({
                    modules: {
                        React: 'react',
                        ReactDOM: 'react-dom'
                    }
                })
            ]),
            treeshake: false
        })
        .then(bundle => bundle.generate({ format: 'iife' }))
        .then(result => {
            res.status(200)
            .type('application/javascript')
            .send(result.code);
        })
        .catch(next);
    } else {
        next();
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/comments-count.json', (req, res) => {
    res.send({
        counts: req.query.shortUrls.split(',').map(id => {
            return {
                id,
                count: Math.floor(Math.random() * 5000)
            };
        })
    });
});

var port = process.env.PORT || 4000;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Example ready on http://localhost:' + port);
});
