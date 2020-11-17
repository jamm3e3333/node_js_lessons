// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mognodb.ObjectID;

const {MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, {useUnifiedTopology: true}, (error, client) => {
    if(error){
        return console.log('Unable to connect to database.');
    }
    const db = client.db(databaseName);

    db.collection('users').deleteOne({
        name: 'Vladan'
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })



    // db.collection('tasks').updateMany({
    //     completed: true
    // },{
    //     $set: {
    //         completed: false
    //     }
    // }).then((resolve) => {
    //     console.log(resolve);
    // }).catch((error) => {
    //     console.log(error);
    // });
    // db.collection('users').updateOne({
    //     _id: new ObjectID("5f9dac056806cb022c8b2f76")
    // }, {
    //     $set: {
    //         name: 'Debo'
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('users').findOne({
    //     _id: ObjectID("5f9dac056806cb022c8b2f76")
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to fetch data.');
    //     }
    //     if(!result){
    //         console.log('Result not in a databased.');
    //     }
    //     console.log(result);
    // });

    // db.collection('users').find({
    //     age: 25
    // }).count((error, result) => {
    //     if(error){
    //         return console.log('Error querying data.');
    //     }
    //     if(!result){
    //         return console.log('Not available to fetch the data.');
    //     }
    //     console.log(result);
    // })

    // db.collection('tasks').findOne({
    //     _id: new ObjectID("5f9db10270a01812ccf498df")
    // }, (error, result) => {
    //     if(error){
    //         return console.log(error);
    //     }
    //     if(!result){
    //         return console.log('No result for this query.');
    //     }
    //     console.log(result);
    // });

    // db.collection('tasks').find({
    //     completed: true
    // }).toArray((error, result) => {
    //     if(error){
    //         return console.log(error);
    //     }
    //     console.log(result);
    // });
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Piotr',
    //     age: 49
    // }, (error, result) => {
    //     if(error){
    //         return console.log(error);
    //     }
    //     console.log(result.ops);
    //     console.log(result.insertedCount);
    // });
    // db.collection('tasks').insertMany([
    //     {
    //         task: 'MathHW',
    //         completed: true
    //     },
    //     {
    //         task: 'WorkThings',
    //         completed: true
    //     },
    //     {
    //         task: 'excersise Doing',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log(error);
    //     }
    //     console.log(result.ops);
    // });
    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     },
    //     {
    //         name: 'Dick',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log(error);
    //     }
    //     console.log(result.ops);
    // });
});

