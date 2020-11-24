const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true ,
    useUnifiedTopology: true    
})

const User = mongoose.model('User', {
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
    }
})

const Task = mongoose.model('Task',{
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
})

const colors = mongoose.model('Color',{
    name: {
        type: String,
        required: true,
        trim: true
    },
    rgb: {
        type: String,
        required: true,
        validate(value){
            if(value.length < 7 && value.length > 7){
                throw new Error('The length must be 6 digit number.');
            }
        }
    },
    description: {
        type: String,
        trim: true,
        required: false
    }
});

const me = new User({
    name: 'Jackop',
    email: 'JAMM@GOOGLE.COM',
    password: 'hesoyam'
});


const work = new Task({
    description: 'Sleeping'
});

const blue = new colors({
    name: 'lightblue',
    rgb: '#90ee90',
    description: 'It\'s light blue color.'
})

const green = new colors({
    name: 'lightgreen',
    rgb:  '#32cd32'
});

// me.save()
//     .then(() => {
//         console.log(me);
//     })
//     .catch((error) => {
//         console.log(error);
//     })


// work.save()
//     .then(() => {
//         console.log(work);
//     })
//     .catch((err) => {
//         console.log(error);
//     })

// blue.save()
//     .then(() => {
//         console.log(blue);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

green.save()
    .then(() => {
        console.log(green);
    })
    .catch((err) => {
        console.log(err);
    });