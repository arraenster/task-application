const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const client = new MongoClient('mongodb://127.0.0.1:27017', { monitorCommands: true });

client.connect().then(() => {
    console.log('Connected!')

    const db = client.db('task-manager');

    db.collection('users').insertOne({
        name: "AAA",
        age: 34
    }).then((result) => {
        console.log('Result is ' + result)
    })
})
