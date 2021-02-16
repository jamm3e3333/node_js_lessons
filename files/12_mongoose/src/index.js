const express = require('express');
require('./db/mongoose.js');
const multer = require('multer');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3030;

const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload a Word document.'))
        }
        cb(undefined, true);
    }
})


app.post('/upload', upload.single('upload'), (req,res) => {
    res.send()
}, (error,req,res,next) => {
    res.status(400).send({error: error.message});
})

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
})

// app.use((req,res,next) => {
//     if(req){
//         res.send('Server is under the maintenance, please try again later.')
//             .status(503)
//     }
//     else{
//         next()
//     }
// })