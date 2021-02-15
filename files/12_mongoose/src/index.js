const express = require('express');
require('./db/mongoose.js');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3030;

// app.use((req,res,next) => {
//     if(req){
//         res.send('Server is under the maintenance, please try again later.')
//             .status(503)
//     }
//     else{
//         next()
//     }
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
})
