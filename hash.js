// Rollup does transpiling and bundling
// This script takes care of generating revision hash and file map
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const junk = require('junk');
const mkdirp = require('mkdirp');
const isFile = require('is-file');
const uglify = require('uglify-js');

const SOURCE_PATH = path.join(__dirname, 'dist');
const DESTINATION_PATH = path.join(__dirname, 'dist/hashed');

prepareWorkingPath(DESTINATION_PATH);
const fileMap = listFiles(SOURCE_PATH)
.map(fullPath => writeRewritten(fullPath, DESTINATION_PATH))
.reduce(function(map, rename) {
    return Object.assign(map, rename);
}, {});
writeMap(fileMap, DESTINATION_PATH);


function writeRewritten (fullPath, destinationPath) {
    const fileContent = fs.readFileSync(fullPath);
    const revision = hash(fileContent);
    const renamedPath = rename(fullPath, destinationPath, appendRevision(revision));
    const ext = path.extname(fullPath);
    const renamedFile = path.basename(renamedPath, ext);
    const minified = uglify.minify({
        [renamedFile]: fileContent.toString()
    }, {
        fromString: true,
        outSourceMap: renamedFile + '.map'
    });
    fs.writeFileSync(renamedPath, minified.code);
    fs.writeFileSync(path.join(destinationPath, renamedFile + '.map'), minified.map);
    return {
        [path.basename(fullPath, ext)]: renamedFile
    };
}

function writeMap (map, destinationPath) {
    fs.writeFileSync(path.join(destinationPath, 'assets.json'), JSON.stringify(map));
}

function prepareWorkingPath (fullPath) {
    mkdirp.sync(fullPath);
}

function hash (file) {
    return crypto.createHash('md5').update(file).digest('hex').slice(0, 10);
}

function rename (filename, destination, modifier) {
    const ext = path.extname(filename);
    const basename = path.basename(filename, ext);
    return path.join(destination, modifier(basename, ext));
}

function listFiles (basePath) {
    return fs.readdirSync(basePath)
    .filter(junk.not)
    .map(file => path.join(basePath, file))
    .filter(isFile.sync);
}

function appendRevision (revision) {
    return function(filename, ext) {
        return filename + '.' + revision + ext;
    };
}
