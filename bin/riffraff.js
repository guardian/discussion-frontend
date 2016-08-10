const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const listFiles = require('./lib/list');
const deploy = require('../deploy.json');
process.env.ARTEFACT_PATH = path.join(__dirname, '../');
const riffraff = require('node-riffraff-artefact');

const SOURCE_PATH = path.join(__dirname, '../dist/hashed');
const DESTINATION_PATH = path.join(__dirname, '../tmp/riffraff');

mkdirp.sync(DESTINATION_PATH);
const pack = getPackage(deploy);

if (!pack) {
    process.exit(2);
}
copyHashedFiles(DESTINATION_PATH + '/packages/' + pack);
copyDeployJson(DESTINATION_PATH, deploy);
uploadToRiffRaff().then(function() {
    // eslint-disable-next-line no-console
    console.log('Upload done');
}).catch(function(error) {
    // eslint-disable-next-line no-console
    console.error('Upload error', error);
});


function copyHashedFiles (destinationPath) {
    mkdirp.sync(destinationPath);

    listFiles(SOURCE_PATH)
    .forEach(file => {
        fs.createReadStream(file)
        .pipe(fs.createWriteStream(path.join(destinationPath, path.basename(file))));
    });

}

function getPackage (json) {
    return Object.keys(json.packages)
    .filter(key => json.packages[key].type === 'aws-s3')[0];
}

function copyDeployJson (destinationPath, json) {
    fs.writeFileSync(path.join(destinationPath, 'deploy.json'), JSON.stringify(json));
}

function uploadToRiffRaff () {
    riffraff.settings.leadDir = path.join(__dirname, '../tmp/riffraff');

    return riffraff.s3FilesUpload();
}
