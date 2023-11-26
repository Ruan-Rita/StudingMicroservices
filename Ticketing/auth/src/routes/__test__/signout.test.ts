import request from 'supertest'
import app from '../../app'

it('Clears the Cookie after signing out', async () => {
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
            password: 'r987ruan65r'
        })
        .expect(200)

    const response = await request(app)
        .post('/api/user/signout')
        .send()
        .expect(200)

    expect(response.get("Set-Cookie")[0]).toBe('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
})