const chalk = require('chalk');
console.log(chalk.white.bgBlue('utils.js'));
const name = {
    name:"kokot",
    feature:"being a dick",
    volume(radius,height){
        console.log(chalk.black.bgYellowBright(Math.PI*(radius*radius)*height));
    }
};

module.exports = name;