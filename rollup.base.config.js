const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const inject = require('rollup-plugin-inject');
const path = require('path');

const basePlugins = exports.basePlugins = [
    nodeResolve({
        jsnext: false,
        main: true,
        preferBuiltins: true
    }),
    commonjs()
];

exports.productionPlugins = basePlugins.concat([
    replace({
        'process.env.NODE_ENV': '\'production\'',
        'process.env': 'false',
        'typeof process': '\'undefined\''
    }),
    babel({
        exclude: ['node_modules/**'],
        plugins: ['transform-react-remove-prop-types']
    })
]);

exports.devPlugins = basePlugins.concat([
    inject({
        modules: {
            process: path.join(__dirname, 'example/lib/process.js')
        }
    }),
    babel({
        exclude: ['node_modules/**']
    })
]);

exports.standalonePluginsExtraReact = [
    inject({
        modules: {
            React: 'react',
            ReactDOM: 'react-dom'
        }
    })
];

exports.standalonePluginsExtraPreact = [
    inject({
        modules: {
            React: 'preact-compat',
            ReactDOM: 'preact-compat'
        }
    })
];
