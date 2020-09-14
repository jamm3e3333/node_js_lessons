const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

yargs.version('1.1.1');
yargs.command({
    command: 'add',
    describe: 'add a note',
    builder: {
        title: {
            describe: 'My title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'My body',
            demandOption: true,
            type: 'string'
        },
        number: {
            describe: 'This is the number',
            demandOption: true,
            type: 'number'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body, argv.number);
    }
});

yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'The title to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNotes(argv.title);
    }
});

yargs.command({
    command: 'list',
    describe: 'list a note',
    handler: () => {
        notes.listNotes();
    }
});

yargs.command({
   command: 'read',
   describe: 'Read a note',
   builder: {
       title: {
           describe: 'Title of the note',
           demandOption: true,
           type: 'string'
       }
   },
   handler(argv){
    notes.readNotes(argv.title);
   }
});

yargs.parse();