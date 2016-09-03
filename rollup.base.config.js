const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const inject = require('rollup-plugin-inject');
const alias = require('rollup-plugin-alias');
const postcss = require('rollup-plugin-postcss');
const postcssModules = require('postcss-modules');
const precss = require('precss');
const postcssSCSS = require('postcss-scss');

const cssExportMap = {};

const base = [
    postcss({
        plugins: [
            precss(),
            postcssModules({
                getJSON (id, exportTokens) {
                    cssExportMap[id] = exportTokens;
                }
            })
        ],
        parser: postcssSCSS,
        getExport (id) {
            return cssExportMap[id];
        }
    }),
    nodeResolve({
        jsnext: false,
        main: true,
        preferBuiltins: true
    }),
    commonjs({
        namedExports: {
            'node_modules/react/lib/ReactDOM.js': ['render', 'unmountComponentAtNode'],
            'preact-compat': ['render', 'unmountComponentAtNode'],
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
    alias({
        '../model/proptypes': path.join(__dirname, 'src/model/proptypes-prod.js')
    }),
    babel({
        comments: false,
        exclude: ['node_modules/**', '**/*.css'],
        plugins: ['transform-react-remove-prop-types']
    })
];

const development = [
    replace({
        'process.env.NODE_ENV': '\'development\''
    }),
    babel({
        exclude: ['node_modules/**', '**/*.css']
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
