const yargs = require('yargs');
const weather = require('./app.js');

yargs.command({
    command: 'city',
    describe: 'city ',
    builder: {
        name: {
            describe: 'name of the city',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        weather(argv.name);
    }
})

yargs.parse();