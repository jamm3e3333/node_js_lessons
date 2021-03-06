const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('./task.js');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a postive number.');
            }
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid!');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length < 6){
                throw new Error('The password must be longer than 6 characters.');
            }
            else if(value.toLowerCase().includes('password')){
                throw new Error('The password cannot contain a word \"password\".');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar:{
        type: Buffer
    }
},{
    timestamps: true
})

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

userSchema.methods.generateAuthToken = async function(){
    const user = this ;
    const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse');
    user.tokens = user.tokens.concat({token: token})
    await user.save()

    return token;
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email: email})

    if(!user){
        throw new Error('Unable to log in.');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Unable to log in.');
    }

    return user;
}

//Hash the plain text password

userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next();
})

userSchema.pre('remove', async function (next){
    const user = this;
    await Task.deleteMany({owner: user._id});

    console.log('Just before deleting.');
    next();
})

const User = mongoose.model('User', userSchema)

module.exports = User;