const chalk = require('chalk');
const fs = require('fs');
const tasks = require('./notes.js');
const yargs = require('yargs');
tasks();

const dataBuffer = fs.readFileSync('notes.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);



const dataFiltered = (option,data) => {
    if(option === 'done' || option === 'Done' || option === 'DONE'){
        const filtered = data.tasks.filter((dat) => {
            return dat.completed === true;
        });

        filtered.forEach((dat) => {
            console.log(chalk.green.inverse(`the task \"${dat.text}\" is completed`));
        });
    }
    else if(option === 'undone' || option === 'Undone' || option === 'UNDONE'){
        const filtered = data.tasks.filter((dat) => {
            return dat.completed === false;
        })

        filtered.forEach((dat) => {
            console.log(chalk.red.inverse(`the task \"${dat.text}\" is not completed`));
        });
    }    
}


yargs.command({
    command: 'filter',
    describe: 'Filter by the argument',
    builder: {
        option: {
            describe: 'filter',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        dataFiltered(argv.option,data);
    }
})

yargs.parse();


const square = x => console.log(chalk.greenBright.inverse(` ${x * x} `));



square(10);

const event = {
    name: 'Jacob',
    guestList: ['Andrew','Jen','Mike'],
    printGuestList(){
        console.log(`Guest list for: ${this.name}`);
        this.guestList.forEach((name) => {
            console.log(`This person is invited: ${name} for a ${this.name}\'s party`);
        });
    }
}

event.printGuestList();