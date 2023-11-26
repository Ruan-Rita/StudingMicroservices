import request from 'supertest'
import app from '../../app'

it('responds with details about the current user', async () => {
    const cookie = await global.signin()

    const response = await request(app)
        .get('/api/user/currentuser')
        .set("Cookie", cookie)
        .send()
        .expect(200)

    expect(response.body.currentUser.email).toBe('ruan@email.com')
})

it('responds with null if not authenticated', async () => {
    const cookie = await global.signin()

    const response = await request(app)
        .get('/api/user/currentuser')
        .send()
        .expect(200)

    expect(response.body.currentUser).toBe(null)
})