const express = require('express');
const Task = require('../models/task.js');
const auth = require('../middleware/auth.js');
const router = new express.Router();

router.post('/task', auth, async(req,res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

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

router.get('/task', auth, async(req,res) => {
    const match = {};
    const sort = {};

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc'? -1 : 1;
    }

    try{
        const user = await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        const tasks = user.tasks;
        res.send(tasks)
            .status(200);
        }
        catch(e){
            res.status(500)
                .send();
        }
})

router.get('/task/:id', auth, async(req,res) => {
    const _id = req.params.id;

    try{
        const task = await Task.findOne({_id, owner: req.user._id})
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

router.delete('/task/:id', auth, async(req,res) => {
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
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

router.patch('/task/:id', auth, async(req,res) => {
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
        const task = await Task.findOne({_id: req.params.id, owner:req.user._id});
        
        if(!task){
            return res.status(404)
                        .send();
        }
        updates.forEach((update) => {
            task[update] = req.body[update];
        });

        await task.save();
        res.status(201)
            .send(task)
    }
    catch(e){
        res.status(400)
            .send(e);
    }
})

module.exports = router;
