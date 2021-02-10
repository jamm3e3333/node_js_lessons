require('./db/mongoose.js');
const Task = require('./models/task.js');


const getId = async(id,description) => {
    const found = await Task.findByIdAndDelete(id);
    const countNumber = await Task.countDocuments({completed: false});
    console.log(countNumber);
    return found;
}

const myFunction = async () => {

}

// getId('5fe660ff5212e63e64155e57','lying on the bed')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((e) => {
//         console.log(e);
//     })

// Task.findById('6010690e9f0b7255ace94d8e')
//     .then((_id) => {
//         console.log(_id);
//         return Task.count({'completed':'false'})
//     }).then((result) => {
//         console.log(result)
//     })
//     .catch((e) => {
//         console.log(e);
//     })


