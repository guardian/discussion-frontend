const plugins = require('./rollup.base.config').standalonePreactProduction;

const config = {
    entry: 'src/index.js',
    format: 'umd',
    moduleName: 'guardian.app.discussion',
    dest: 'dist/discussion-frontend.preact.umd.js',
    sourceMap: true,
    plugins: plugins
};

export default config;
