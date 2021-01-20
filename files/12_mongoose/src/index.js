const express = require('express');
require('./db/mongoose.js');
const User = require('./models/user.js');
const Task = require('./models/task.js');


const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());

app.post('/users', (req,res) => {
    const user = new User(req.body);

    user.save()
        .then(() => {
            res.status(201)
               .send(user);
        })
        .catch((err) => {
            res.status(400)
               .send(err);
        })
});

app.get('/users', (req,res) => {
    User.find({})
        .then((users) => {
            res.send(users);
        })
        .catch((e) => {
            res.status(500)
                .send();
        })
})

app.get('/users/:id', (req,res) => {
    const _id = req.params.id;

    User.findById(_id)
        .then((user) => {
            if(!user){
                return res.status(404)
                          .send();
            }
            res.send(user);
        })
        .catch((e) => {
            res.status(500)
                .send(e);
        })
    console.log(req.params.id);
})

app.post('/task',(req,res) => {
    const task = new Task(req.body);

    task.save()
        .then(() => {
            res.status(201)
               .send(task);
        })
        .catch((err) => {
            res.status(400)
               .send(err);
        })
})

app.get('/task', (req,res) => {
    Task.find({})
        .then((tasks) => {
            res.send(tasks);
        })
        .catch((e) => {
            res.status(500)
                .send();
        })
})

app.get('/task/:id', (req,res) => {
    const _id = req.params.id;

    Task.findById(_id)
        .then((task) => {
            if(!task){
                return res.status(404)
                            .send();
            }
            res.send(task);
        })
        .catch((e) => {
            res.status(500)
                .send(e);
        })
})

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
})