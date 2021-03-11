const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user.js');
const auth = require('../middleware/auth.js');
const router = new express.Router();

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
        const token = await user.generateAuthToken();
        res.send({user,token}).status(200);
    }
    catch(e){
        res.status(400).send();
    }
})

router.post('/users/logout', auth, async(req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token;
        })
        await req.user.save();

        res.send()
    }
    catch(e){
        res.status(500).send({error: 'You weren\'t logged out from all accounts.'});
    }
})

router.post('/users/logoutAll', auth, async(req,res) => {
    const user = req.user;
    user.tokens = [];
    try{
        await user.save();
        res.status(200).send(user);
    }
    catch(e){
        res.status(500).send();
    }

})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error('Please upload a jpg, jpeg or png format of image.'));
        }
        cb(undefined,true);
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    try{
        if(!req.file.buffer){
            throw new Error("You sent an empty file.");
        }
        const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();
        req.user.avatar = buffer;
        await req.user.save();
        res.send();
    }
    catch(e){
        res.send({error: e.message})
            .status(400);
    }
},(error,req,res,next) => {
    res.status(400).send({error: error.message});
})

router.delete('/users/avatar/me', auth, async(req,res) => {
    try{
        req.user.avatar = undefined;
        await req.user.save();
        res.send(req.user);
    }
    catch(e){
        res.status(400)
            .send({error: e.message});
    }
})

router.get('/users/me', auth, async(req,res) => {
    res.send(req.user);
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

router.patch('/users/me', auth ,async(req,res) => {
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
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        }) 

        await req.user.save();

        res.send(req.user)
            .status(201);
    }
    catch(e){
        res.status(400)
            .send(e);
    }
})

router.delete('/users/me', auth, async(req,res) => {
    try{
        await req.user.remove()
        res.send(req.user)
    }
    catch(e){
        res.status(400)
            .send(e);
    }
})

router.get('/users/:id/avatar', async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar){
            throw new Error("There\'s no user or user\'s avatar");
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    }
    catch(e){
        req.status(404)
            .send();
    }
})

module.exports = router;