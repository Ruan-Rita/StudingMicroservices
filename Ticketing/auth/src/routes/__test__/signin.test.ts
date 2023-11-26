import request from 'supertest'
import app from '../../app'

it('Fails when a email that does not exist in suplied', async () => {
    await request(app)
        .post('/api/user/signin')
        .send({
            email: 'test@gmail.com',
            password: '123ruan'
        })
        .expect(400)
})

it('Fails when a password that does not exist in suplied', async () => {
    await request(app)
        .post('/api/user/signup')
        .send({
            email: 'ruan@gmail.com',
            password: 'r987ruan65r'
        })
        .expect(201)

    await request(app)
        .post('/api/user/signin')
        .send({
            email: 'ruan@gmail.com',
            password: '11123ruan'
        })
        .expect(400)
})

it("Set Cookie after successful signin", async () => {
    await request(app)
        .post('/api/user/signup')
        .send({
            email: 'ruan@gmail.com',
            password: 'r987ruan65r'
        })
        .expect(201)

    const response = await request(app)
        .post('/api/user/signin')
        .send({
            email: 'ruan@gmail.com',
            password: 'r987ruan65r'
        })
        .expect(200)

    expect(response.get("Set-Cookie")).toBeDefined()
})