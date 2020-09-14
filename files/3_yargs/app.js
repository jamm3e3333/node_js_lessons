const { argv } = require('yargs');
const yargs = require('yargs');
const arg = require('yargs');


//customize yargs version
arg.version('1.1.0');

//create add command
arg.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'body',
            demandOption: true,
            type: 'string'
        },
        number: {
            describe: 'number',
            demandOption: true,
            type: 'numner'
        }
    },
    handler: (argv) => {
        console.log(`Title: ${argv.title}, \nbody part: ${argv.body}, \nnumber: ${argv.number}`);
    }
});

//removing an object
arg.command({
    command: 'remove',
    describe: 'Remove an element',
    handler: () =>{
        console.log('Removing an element');
    }
});

arg.command({
    command: 'read',
    describe: 'Read an element',
    handler: () => {
        console.log('Reading a new elment');
    }
});

arg.command({
    command: 'list',
    describe: 'List an element',
    handler: () =>{
        console.log('Listing current element');
    }

});

arg.command({
    command: 'modify',
    describe: 'modify the current element',
    builder: {
        title: {
            describe: 'New title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'new body',
            demandOption: true,
            type: 'string'
        },
        number: {
            describe: 'new number',
            demandOption: true,
            type: 'number'
        }
    },
    handler: (argv) => {
        console.log(`New title: ${argv.title} \nNew body: ${argv.body} \nNew number: ${argv.number}`);
    }    
});

//add, remove, read, list
arg.parse();