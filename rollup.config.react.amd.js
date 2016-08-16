const plugins = require('./rollup.base.config').standaloneReactProduction;

const config = {
    entry: 'src/index.js',
    format: 'amd',
    dest: 'dist/discussion-frontend.react.amd.js',
    sourceMap: true,
    plugins: plugins
};

export default config;
