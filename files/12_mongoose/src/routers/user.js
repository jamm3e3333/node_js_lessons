const express = require('express');
const User = require('../models/user.js');
const router = new express.Router();

router.get('/test', (req,res) => {
    res.send('From a new file.');
})


router.post('/users', async(req,res) => {
    const user = new User(req.body);

    try{
        if(!user){
            return res.status(404)
                        .send();
        }
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201)
            .send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
});

router.post('/users/login', async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        if(!user || !token){
            return res.status(400)
                        .send();
        }
        res.send({user,token})
    }
    catch(e){
        res.status(400).send();
    }
})
    
    // user.save()
    //     .then(() => {
    //         res.status(201)
    //            .send(user);
    //     })
    //     .catch((err) => {
    //         res.status(400)
    //            .send(err);
    //     })


router.get('/users', async(req,res) => {
    try{
        const user = await User.find({});
        const countUsers = await User.countDocuments({});
        if(!user){
            return res.status(404)
                        .send();
        }
        res.status(200)
            .send(user);
        if(!countUsers){
            console.log(countUsers);
        }
        else{
            console.log(countUsers);
        }
        
    }
    catch(e){
            res.status(500)
                .send(e);
    }
})

router.get('/users/:id', async(req,res) => {
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

router.patch('/users/:id', async(req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpdate = ['name','age','password','email'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdate.includes(update);
    })

    if(!isValidOperation){
        return res.status(404)
                    .send({error: 'Invalid updates.'});
    }
    try{
        const user = await User.findById(req.params.id);
        updates.forEach((update) => {
            user[update] = req.body[update];
        }) 

        await user.save()
        //const user = await User.findOneAndUpdate({_id: req.params.id},req.body,{new: true, runValidators: true});
        if(!user){
            return res.status(404)
                        .send();
        }
        res.send(user)
            .status(201);
    }
    catch(e){
        res.status(400)
            .send(e);
    }
})

router.delete('/users/:id', async(req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404)
                        .send();
        }
        res.send(user)
            .status(200);
    }
    catch(e){
        res.status(400)
            .send(e);
    }
})

module.exports = router;