const express = require('express');
const multer = require('multer');
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
    dest: 'images/avatar',
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

router.post('/users/me/avatar', upload.single('avatar'), (req,res) => {
    res.send();
},(error,req,res,next) => {
    res.status(400).send({error: error.message});
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

module.exports = router;