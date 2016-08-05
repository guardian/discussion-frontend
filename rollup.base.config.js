const babel = require('rollup-plugin-babel');

module.exports = {
    entry: 'src/index.js',
    plugins: [
        babel({
            exclude: ['node_modules/**']
        })
    ]
};
