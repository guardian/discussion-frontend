const plugins = require('./rollup.base.config').standalonePreactProduction;

const config = {
    entry: 'src/index.js',
    format: 'iife',
    moduleName: 'guardian.app.discussion',
    dest: 'dist/discussion-frontend.preact.iife.js',
    sourceMap: true,
    plugins: plugins
};

export default config;
