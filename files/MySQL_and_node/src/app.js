const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');


const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
const port = process.env.PORT || 3000;

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get('',(req,res) => {
    res.render('index',{
        title: 'Welcome'
    })
});

app.listen(port,() => {
    console.log(`Listening on port: ${port}`);
});