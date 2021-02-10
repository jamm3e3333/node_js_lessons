const express = require('express');
const Task = require('../models/task.js');
const router = new express.Router();

router.post('/task', async(req,res) => {
    const task = Task(req.body);

    try{
        if(!task){
            res.status(404)
                .send();
        }
        await task.save()
            res.status(201)
               .send(task);
        }
        catch(e){
            res.status(400)
               .send(e);
        }
})

router.get('/task', async(req,res) => {
    try{
        const task = await Task.find({});
        if(!task){
            return res.status(404)
                .send();
        }
        res.send(task)
            .status(200);
        }
        catch(e){
            res.status(500)
                .send();
        }
})

router.get('/task/:id', async(req,res) => {
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

router.delete('/task/:id', async(req,res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404)
                        .send();
        }
        res.status(200)
            .send(task);
    }
    catch(e){
        res.status(400)
            .send(e);
    }
})

router.patch('/task/:id', async(req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed','description'];
    const isValidParameters = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if(!isValidParameters){
        return res.status(404)
                    .send({error:'Invalid updates.'});
    }


    try{
        const task = await Task.findById(req.params.id);
        updates.forEach((update) => {
            task[update] = req.body[update];
        });

        await task.save();
        //const task = await Task.findOneAndUpdate({_id: req.params.id},req.body,{new: true, runValidators: true});
        if(!task){
            return res.status(404)
                        .send();
        }
        res.status(201)
            .send(task)
    }
    catch(e){
        res.status(400)
            .send(e);
    }
})

module.exports = router;
