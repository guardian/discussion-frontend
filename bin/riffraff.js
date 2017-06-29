const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const listFiles = require('./lib/list');
const yaml = require('js-yaml');
process.env.ARTEFACT_PATH = path.join(__dirname, '../');
const riffraff = require('node-riffraff-artefact');

const SOURCE_PATH = path.join(__dirname, '../dist/hashed');
const DESTINATION_PATH = path.join(__dirname, '../tmp/riffraff');
const deploy = yaml.safeLoad(fs.readFileSync('riff-raff.yaml', 'utf8'));

mkdirp.sync(DESTINATION_PATH);

const copyHashedFiles = (destinationPath) => {
    mkdirp.sync(destinationPath);

    listFiles(SOURCE_PATH)
    .forEach(file => {
        fs.createReadStream(file)
        .pipe(fs.createWriteStream(path.join(destinationPath, path.basename(file))));
    });

};

const getPackage = (yaml) => {

    return Object.keys(yaml).filter(key => yaml[key].type === 'aws-s3')[0];
};

const copyRiffRaffYaml = (destinationPath, yaml) => {
    fs.writeFileSync(path.join(destinationPath, 'riff-raff.yaml'), JSON.stringify(yaml));
};

const uploadToRiffRaff = () => {
    riffraff.settings.leadDir = path.join(__dirname, '../tmp/riffraff');

    return riffraff.s3FilesUpload();
};

const pack = getPackage(deploy);

if (!pack) {
    process.exit(2);
}

copyHashedFiles(DESTINATION_PATH + '/packages/' + pack);
copyRiffRaffYaml(DESTINATION_PATH, deploy);
uploadToRiffRaff().then(function() {
    // eslint-disable-next-line no-console
    console.log('Upload done');
}).catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Upload error', error);
});
