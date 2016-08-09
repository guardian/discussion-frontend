const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const inject = require('rollup-plugin-inject');

const basePlugins = exports.basePlugins = [
    nodeResolve({
        jsnext: true,
        main: true,
        preferBuiltins: true
    }),
    commonjs()
];

exports.productionPlugins = basePlugins.concat([
    babel({
        exclude: ['node_modules/**'],
        plugins: ['transform-react-remove-prop-types']
    })
]);

exports.devPlugins = basePlugins.concat([
    replace({
        'process.env.NODE_ENV': '\'dev\''
    }),
    babel({
        exclude: ['node_modules/**']
    })
]);

exports.standalonePluginsExtra = [
    inject({
        modules: {
            React: 'react',
            ReactDOM: 'react-dom'
        }
    })
];
