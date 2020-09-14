const fs = require('fs');
const { showCompletionScript } = require('yargs');

const dataBuffer = fs.readFileSync('./playground/person.json');
const data = dataBuffer.toString();
let dataParsed = JSON.parse(data);

dataParsed.name = 'Jacob';
dataParsed.age = 25;
const dataChanged = JSON.stringify(dataParsed);
fs.writeFileSync('./playground/person.json',dataChanged);

console.log(data);
console.log(dataParsed);