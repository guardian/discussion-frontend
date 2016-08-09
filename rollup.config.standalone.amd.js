const plugins = require('./rollup.base.config').productionPlugins;
import inject from 'rollup-plugin-inject';

const config = {
    entry: 'src/standalone.js',
    format: 'amd',
    dest: 'dist/discussion-frontend.standalone.amd.js',
    plugins: plugins.concat([
        inject({
            modules: {
                React: 'react',
                ReactDOM: 'react-dom'
            }
        })
    ])
};

export default config;
