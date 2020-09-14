const fs = require('fs');
const book = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday',
}

const bookJSON = JSON.stringify(book);
const parsedData = JSON.parse(bookJSON);

fs.writeFileSync('books.json',bookJSON);
const readData = fs.readFileSync('books.json');

console.log(JSON.parse(readData.toString()));
console.log(parsedData.title);
console.log(bookJSON);
