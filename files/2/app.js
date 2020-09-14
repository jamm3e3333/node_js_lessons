const validator = require('validator');
const name = require('./utils.js');
const notes = require('./notes.js');
const chalk = require('chalk');
const not= notes();
const command = process.argv[2];

if(command === 'add'){
    console.log('Adding a file');
}
else if(command ==='remove'){
    console.log('Removing a file');
}

console.log(chalk.red.inverse(not));
console.log(name.name);
name.volume(54.1,2);
console.log(validator.isEmail('jackobvala@seznam.cz'));
console.log(validator.isURL('https://kokot.cz'));