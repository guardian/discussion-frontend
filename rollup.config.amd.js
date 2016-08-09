const base = require('./rollup.base.config');

const config = Object.assign(base, {
    entry: 'src/standalone.js',
    format: 'amd',
    dest: 'dist/discussion-frontend.amd.js'
});

export default config;
