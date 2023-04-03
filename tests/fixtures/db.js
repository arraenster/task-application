const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'admin',
    email: 'admin@test.com',
    password: 'asdRTYU12345!',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.PASSWORD_SALT)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'admin2',
    email: 'admin2@test.com',
    password: 'asdRTYU6789!',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.PASSWORD_SALT)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'To go for a walk',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: true,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third task',
    completed: true,
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()

    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwo,
    taskOne,
    setupDatabase
}