const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const inject = require('rollup-plugin-inject');
const alias = require('rollup-plugin-alias');

const base = [
    nodeResolve({
        jsnext: false,
        main: true,
        preferBuiltins: true
    }),
    commonjs({
        namedExports: {
            'node_modules/react/lib/ReactDOM.js': ['render'],
            'preact-compat': ['render'],
            'preact': ['render']
        }
    })
];

const aliasesReact = [
    alias({
        'react-dom': path.join(__dirname, 'node_modules/react/lib/ReactDOM.js')
    })
];

const aliasesPreact = [
    alias({
        'react-dom': require.resolve('preact-compat')
    })
];

const production = [
    replace({
        'process.env.NODE_ENV': '\'production\'',
        'typeof process': '\'undefined\''
    }),
    babel({
        comments: false,
        exclude: ['node_modules/**'],
        plugins: ['transform-react-remove-prop-types']
    })
];

const development = [
    replace({
        'process.env.NODE_ENV': '\'development\''
    }),
    babel({
        exclude: ['node_modules/**']
    })
];

const injectReact = [
    inject({
        exclude: ['node_modules/**'],
        modules: {
            React: 'react'
        }
    })
];

const injectPreact = [
    inject({
        exclude: ['node_modules/**'],
        modules: {
            React: 'preact-compat'
        }
    })
];

exports.standaloneReactProduction = [
    ...aliasesReact,
    ...production,
    ...base,
    ...injectReact
];

exports.standaloneReactDevelopment = [
    ...aliasesReact,
    ...development,
    ...base,
    ...injectReact
];

exports.standalonePreactProduction = [
    ...aliasesPreact,
    ...production,
    ...base,
    ...injectPreact
];

exports.standalonePreactDevelopment = [
    ...aliasesPreact,
    ...development,
    ...base,
    ...injectPreact
];
