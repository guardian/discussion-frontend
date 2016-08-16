const plugins = require('./rollup.base.config').standalonePreactProduction;

const config = {
    entry: 'src/index.js',
    format: 'amd',
    dest: 'dist/discussion-frontend.preact.amd.js',
    sourceMap: true,
    plugins: plugins
};

export default config;
