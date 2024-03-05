import request from "supertest";
import { app } from "../../app";

it('has a route handler listening to /api/tickets for post requests', async () => {
    const result = await request(app).post('/api/tickets').send({});
    expect(result.status).not.toEqual(404)
})
it('can only be accessed if user is signed in', async () => {
    await request(app).post('/api/tickets').send({}).expect(401)
})
it('return a status other than 401 if the user is signed in', async () => {
    const result = await request(app).post('/api/tickets').send({})
    expect(result).not.toEqual(401)
})
it('return an error if an invalid titles is provided', async () => {

})
it('return  an error an invalid price provided', async () => {

})
it('create a ticket with valid inputs', async () => {

})