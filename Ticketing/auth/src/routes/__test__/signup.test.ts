import request from 'supertest'
import app from '../../app'

it("return a 201 on successful signup!", async () => {
    await request(app)
        .post('/api/user/signup')
        .send({
            email: 'ruan@gmail.com',
            password: 'r987ruan65r'
        })
        .expect(201)
})

it("return a 400 with an email invalid", async () => {
    await request(app)
        .post('/api/user/signup')
        .send({
            email: 'ruan1121.com',
            password: 'r987ruan65r'
        })
        .expect(400)
})
it("return a 400 with a password invalid", async () => {
    await request(app)
        .post('/api/user/signup')
        .send({
            email: 'ruan1121.com',
            password: 'r98'
        })
        .expect(400)
})

it("return a 400 with a email and a password invalid", async () => {
    const result = (await request(app)
        .post('/api/user/signup')
        .send({}))

    let errors = result.body?.errors
    expect.arrayContaining(errors)
    expect(result.status).toBe(400)
})

it("Disallow duplicate emails", async () => {
    await request(app)
        .post('/api/user/signup')
        .send({
            email: 'ruan@gmail.com',
            password: 'r987ruan65r'
        })
        .expect(201)

    await request(app)
        .post('/api/user/signup')
        .send({
            email: 'ruan@gmail.com',
            password: 'r987ruan65r'
        })
        .expect(400)
})

it("Set Cookie after successful signup", async () => {
    const response = await request(app)
        .post('/api/user/signup')
        .send({
            email: 'ruan@gmail.com',
            password: 'r987ruan65r'
        })
        .expect(201)

    expect(response.get("Set-Cookie")).toBeDefined()
})