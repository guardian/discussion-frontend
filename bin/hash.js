// Rollup does transpiling and bundling
// This script takes care of generating revision hash and file map
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const uglify = require('uglify-js');
const listFiles = require('./lib/list');
const uglifyOpts = require('../uglify.options');
const pkg = require('../package.json');
process.env.ARTEFACT_PATH = path.join(__dirname, '../');
const riffraff = require('node-riffraff-artefact');

const SOURCE_PATH = path.join(__dirname, '../dist');
const DESTINATION_PATH = path.join(__dirname, '../dist/hashed');

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
        outSourceMap: renamedFile + '.map',
        compress: uglifyOpts
    });
    fs.writeFileSync(renamedPath, minified.code);
    fs.writeFileSync(path.join(destinationPath, renamedFile + '.map'), minified.map);
    return {
        [path.basename(fullPath, ext)]: renamedFile + ext
    };
}

function writeMap (map, destinationPath) {
    map['riffraff.build.id'] = riffraff.settings.buildId;
    fs.writeFileSync(path.join(destinationPath, 'assets-v' + pkg.version + '.json'), JSON.stringify(map));
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

function appendRevision (revision) {
    return function(filename, ext) {
        return filename + '.' + revision + ext;
    };
}
