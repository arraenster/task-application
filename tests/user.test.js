const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase} = require('./fixtures/db')

beforeEach( setupDatabase )

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Test2',
        email: 'test2@test.com',
        password: '3456aadgg@'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'Test2',
            email: 'test2@test.com',
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('3456aadgg@')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login not exsiting user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'thisiswrongpassword' //wrong password
    }).expect(400)
})

test('Should return user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send({})
        .expect(200)
})

test('Should not return user profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', 'Bearer ' + 'wrongtoken')
        .send({})
        .expect(401)
})

test('Should delete user profile', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send({})
        .expect(200)

    const user = await User.findById(userOne._id)
    expect(user).toBeNull()
})

test('Should delete user profile', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', 'Bearer ' + 'wrongtoken')
        .send({})
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .attach('avatar', 'tests/fixtures/triss.jpg')
        .expect(200)

        const user = await User.findById(userOne._id)
        expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update existing user', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send({
            name: 'New name'
        })
        .expect(200)

        const user = await User.findById(userOne._id)
        expect(user.name).toEqual('New name')
})

test('Should not update invalid field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send({
            random: 'New name'
        })
        .expect(400)
})