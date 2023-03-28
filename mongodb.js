const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const client = new MongoClient(process.env.DATABASE, { monitorCommands: true });

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
