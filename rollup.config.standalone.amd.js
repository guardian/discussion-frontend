const base = require('./rollup.base.config');
import inject from 'rollup-plugin-inject';

const config = Object.assign(base, {
    entry: 'src/standalone.js',
    format: 'amd',
    dest: 'dist/discussion-frontend.standalone.amd.js',
    plugins: base.plugins.concat([
        inject({
            modules: {
                React: 'react',
                ReactDOM: 'react-dom'
            }
        })
    ])
});

export default config;
