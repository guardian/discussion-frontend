const fs = require('fs');
const path = require('path');
const junk = require('junk');
const isFile = require('is-file');

module.exports = function(basePath) {
    return fs.readdirSync(basePath)
    .filter(junk.not)
    .map(file => path.join(basePath, file))
    .filter(isFile.sync);
};
