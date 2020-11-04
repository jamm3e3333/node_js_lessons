// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mognodb.ObjectID;

const {MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(connectionURL, {useUnifiedTopology: true}, (error, client) => {
    if(error){
        return console.log('Unable to connect to database.');
    }
    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Vladan',
    //     age: 25
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

