const fs = require('fs');
const chalk = require('chalk');


const addNote = (title,body,number) => {
    const notes = loadNotes();
/*     const duplicateNotes = notes.filter( (note) => {
        return note.title === title;
    }); */

    const duplicateNote = notes.find((note) => {
        return note.title === title;
    });
    debugger
    if(duplicateNote === undefined){
        notes.push({
            title: title,
            body: body,
            number: number
        })
    
        saveNotes(notes);
        console.log(chalk.green.inverse('New feature added.'));
    }
    else{
        console.log(chalk.red.inverse('Note title taken!'));
    }
    
}

const removeNotes = (title) => {
    const notes = loadNotes();
    notes.forEach((note,count = 0) => {
        if(note.title === title){
            count += 1;
            console.log(chalk.yellow(`Note number ${count}, with a title: \"${title}\" has been removed`));
        }
    })
    const remainNotes = notes.filter( (note) =>{
        return note.title !== title        
    });

    saveNotes(remainNotes);
    if(notes.length == remainNotes.length){
        console.log(chalk.red.inverse('Nothing has been removed, please check the name of the title.'));
    }
    else{
        console.log(chalk.green.inverse('Note has been removed!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    if(notes.length){
        console.log(notes);
    }
    else{
        console.log(chalk.red.inverse('There is no note.'));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const readNotes = notes.find((note) => {
        return note.title === title;
    });
    if(!readNotes){
        console.log(chalk.red.inverse('Not such a note like this.'));
    }
    else{
        console.log(chalk.yellowBright.inverse(`Title: ${readNotes.title} `));
        console.log(chalk.yellowBright.inverse(`body: ${readNotes.body} `));
        console.log(chalk.yellowBright.inverse(`number: ${readNotes.number} `));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return [];
    }
}


module.exports = {
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNote
}