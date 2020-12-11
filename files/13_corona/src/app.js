const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000

const pathView = path.join(__dirname,'../templates/views');
const pathPartials = path.join(__dirname,'../tamplates/partials');
const pathPublic = path.join(__dirname,'../public');


app.set('view engine','hbs');
app.set('view',pathView);
app.registerPartials(pathPublic);

app.use(express.static(pathPublic));

app.listen(port,() => {
    console.log(`The server is running on port ${port}.`);
})