const plugins = require('./rollup.base.config').productionPlugins;
const inject = require('./rollup.base.config').standalonePluginsExtra;

const config = {
    entry: 'src/standalone.js',
    format: 'amd',
    dest: 'dist/discussion-frontend.standalone.amd.js',
    plugins: plugins.concat(inject)
};

export default config;
