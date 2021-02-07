const express = require('express');
require('./db/mongoose.js');
const User = require('./models/user.js');
const Task = require('./models/task.js');


const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());

app.post('/users', async(req,res) => {
    const user = new User(req.body);

    try{
        await user.save()
        res.status(201)
            .send(user)
    }catch(e){
        res.status(400).send(e)
    }

    
    // user.save()
    //     .then(() => {
    //         res.status(201)
    //            .send(user);
    //     })
    //     .catch((err) => {
    //         res.status(400)
    //            .send(err);
    //     })
});

app.get('/users', async(req,res) => {
    try{
        const user = await User.find({});
        res.status(200)
            .send(user)
    }
    catch(e){
            res.status(500)
                .send(e);
    }
})

app.get('/users/:id', async(req,res) => {
    const _id = req.params.id;

    try{
        const user = await User.findById(_id)
        
        if(!user){
            return res.status(404)
                    .send();
            }
            res.send(user)
                .status(200);
                console.log(_id);
        }
        catch(e){
            res.status(500)
                .send(e);
        }
})

app.post('/task', async(req,res) => {
    const task = Task(req.body);

    try{
        await task.save()
            res.status(201)
               .send(task);
        }
        catch(e){
            res.status(400)
               .send(e);
        }
})

app.get('/task', async(req,res) => {
    try{
        const task = await Task.find({});
        res.send(task)
            .status(200);
        }
        catch(e){
            res.status(500)
                .send();
        }
})

app.get('/task/:id', async(req,res) => {
    const _id = req.params.id;

    try{
        const task = await Task.findById(_id);
        if(!task){
        return res.status(404)
                    .send()
        }
        res.send(task)
            .status(200);
            console.log(_id);
        }
        catch(e){
            res.status(500)
                .send(e);
        }
})

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
})