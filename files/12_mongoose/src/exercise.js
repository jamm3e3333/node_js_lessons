require('./db/mongoose.js');
const Task = require('./models/task.js');

Task.findById('6010690e9f0b7255ace94d8e')
    .then((_id) => {
        console.log(_id);
        return Task.count({'completed':'false'})
    }).then((result) => {
        console.log(result)
    })
    .catch((e) => {
        console.log(e);
    })
