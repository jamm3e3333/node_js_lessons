const fs = require('fs');
const keysJSON = fs.readFileSync('../../../../../Desktop/API/keys.json');
const keys = JSON.parse(keysJSON);

module.exports = keys;
