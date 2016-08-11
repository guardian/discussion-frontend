const plugins = require('./rollup.base.config').productionPlugins;
const inject = require('./rollup.base.config').standalonePluginsExtraReact;

const config = {
    entry: 'src/standalone.js',
    format: 'amd',
    dest: 'dist/discussion-frontend.react.amd.js',
    plugins: plugins.concat(inject)
};

export default config;
