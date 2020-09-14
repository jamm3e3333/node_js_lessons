const fs = require('fs');

fs.writeFileSync('text.txt','This is a new nodejs file');
fs.appendFileSync('text.txt','\nthis is the appended text');
const data = fs.readFileSync('text.txt');
console.log(data.toString());