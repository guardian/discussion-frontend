const path = require('path');
const alias = require('rollup-plugin-alias');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const inject = require('rollup-plugin-inject');
const string = require('rollup-plugin-string');
const nodeResolve = require('rollup-plugin-node-resolve');
const postcss = require('rollup-plugin-postcss');
const postcssModules = require('postcss-modules');
const precss = require('precss');
const postcssSCSS = require('postcss-scss');
const postcssCalc = require('postcss-calc');

const cssExportMap = {};

const base = [
    postcss({
        plugins: [
            precss(),
            postcssModules({
                getJSON (id, exportTokens) {
                    cssExportMap[id] = exportTokens;
                }
            }),
            postcssCalc({
                warnWhenCannotResolve: true
            })
        ],
        parser: postcssSCSS,
        getExport (id) {
            return cssExportMap[id];
        }
    }),
    string({
        include: ['**/*.svg', '**/*.html']
    }),
    nodeResolve({
        module: false,
        jsnext: false,
        main: true,
        preferBuiltins: true
    }),
    commonjs({
        namedExports: {
            'node_modules/react/lib/ReactDOM.js': ['render', 'unmountComponentAtNode'],
            'node_modules/react/lib/ReactMount.js': ['render', 'unmountComponentAtNode'],
            'preact-compat': ['render', 'unmountComponentAtNode'],
            'preact': ['render', 'h', 'options', 'cloneElement', 'Component']
        }
    })
];

const aliasesReact = [
    alias({
        'react-mount': path.join(__dirname, 'node_modules/react/lib/ReactMount.js'),
        './ReactDefaultInjection': path.join(__dirname, 'node_modules/react/lib/ReactDefaultInjection.js'),
        './ReactMount': path.join(__dirname, 'node_modules/react/lib/ReactMount.js'),
        './ReactClass': path.join(__dirname, 'bin/lib/react-class-prod.js'),
        // disable animation and transition events with vendor prefixes
        './getVendorPrefixedEventName': path.join(__dirname, 'bin/lib/react-get-vendor-prefixed-event-name-prod.js')
    })
];

const aliasesPreact = [
    alias({
        'react-dom': require.resolve('preact-compat'),
        'react-mount': require.resolve('preact-compat')
    })
];

const production = [
    replace({
        'process.env.NODE_ENV': '\'production\'',
        'typeof process': '\'undefined\''
    }),
    alias({
        'react-dom': path.join(__dirname, 'bin/lib/react-dom-prod.js'),
        '../model/proptypes': path.join(__dirname, 'src/model/proptypes-prod.js'),
        './checkReactTypeSpec': path.join(__dirname, 'bin/lib/check-react-type-spec-prod.js'),
        './ReactPropTypesSecret': path.join(__dirname, 'bin/lib/react-proptypes-secret-prod.js'),
        './ReactPropTypes': path.join(__dirname, 'bin/lib/react-proptypes-prod.js')
    }),
    babel({
        comments: false,
        exclude: ['node_modules/**', '**/*.css', '**/*.svg', '**/*.html'],
        plugins: ['transform-react-remove-prop-types']
    })
];

const development = [
    replace({
        'process.env.NODE_ENV': '\'development\''
    }),
    alias({
        'react-dom': path.join(__dirname, 'node_modules/react/lib/ReactDOM.js')
    }),
    babel({
        exclude: ['node_modules/**', '**/*.css', '**/*.svg', '**/*.html']
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
