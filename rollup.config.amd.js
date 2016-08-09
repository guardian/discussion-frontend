const plugins = require('./rollup.base.config').productionPlugins;

const config = {
    entry: 'src/index.js',
    format: 'amd',
    dest: 'dist/discussion-frontend.amd.js',
    plugins: plugins
};

export default config;
