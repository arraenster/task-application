const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOne, userTwo, taskOne, setupDatabase} = require('./fixtures/db')

beforeEach( setupDatabase )

test('Should create a task', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send({
            description: 'To do something',
            completed: false
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.description).toEqual('To do something')
})

test('Should return tasks for a user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .expect(200)

    expect(response.body.length).toBe(2)

    const response2 = await request(app)
        .get('/tasks')
        .set('Authorization', 'Bearer ' + userTwo.tokens[0].token)
        .expect(200)

    expect(response2.body.length).toEqual(1)
})

test('Should not delete other user task', async () => {
    await request(app)
        .delete('/tasks/' + taskOne._id)
        .set('Authorization', 'Bearer ' + userTwo.tokens[0].token)
        .expect(404)
    
        const task = await Task.findById(taskOne._id)
        expect(task).not.toBeNull()
})