import request from 'supertest'
import app from '../../app'

it('responds with details about the current user', async () => {
    const signupResponse = await request(app)
        .post('/api/user/signup')
        .send({
            email: 'ruan@gmail.com',
            password: 'r987ruan65r'
        })
        .expect(201)

    const cookie = signupResponse.get('Set-Cookie')

    const response = await request(app)
        .get('/api/user/currentuser')
        .set("Cookie", cookie)
        .send()
        .expect(200)

    expect(response.body.currentUser.email).toBe('ruan@gmail.com')
})