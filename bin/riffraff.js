const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const listFiles = require('./lib/list');
const yaml = require('js-yaml');
process.env.ARTEFACT_PATH = path.join(__dirname, '../');
const riffraff = require('node-riffraff-artefact');

const SOURCE_PATH = path.join(__dirname, '../dist/hashed');
const DESTINATION_PATH = path.join(__dirname, '../tmp/riffraff');
const riffRaff = yaml.safeLoad(fs.readFileSync('riff-raff.yaml', 'utf8'));

mkdirp.sync(DESTINATION_PATH);

const copyHashedFiles = (destinationPath) => {
    mkdirp.sync(destinationPath);

    listFiles(SOURCE_PATH)
    .forEach(file => {
        fs.createReadStream(file)
        .pipe(fs.createWriteStream(path.join(destinationPath, path.basename(file))));
    });

};

const copyRiffRaffYaml = (destinationPath, rr) => {

    const rrFile = yaml.safeDump(rr);
    fs.writeFileSync(path.join(destinationPath, 'riff-raff.yaml'), rrFile);
};

const uploadToRiffRaff = () => {
    riffraff.settings.leadDir = path.join(__dirname, '../tmp/riffraff');

    return riffraff.s3FilesUpload();
};

copyHashedFiles(DESTINATION_PATH + '/static');
copyRiffRaffYaml(DESTINATION_PATH, riffRaff);
uploadToRiffRaff().then(() => {
    // eslint-disable-next-line no-console
    console.log('Upload done');
}).catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Upload error', error);
});
