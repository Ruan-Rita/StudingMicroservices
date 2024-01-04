import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose';
import app from '../app';

let mongo: any

declare global {
    var signin: () => Promise<string[]>;
}

global.signin = async () => {
    const email = 'ruan@email.com'
    const password = 'ruan123'

    const response = await request(app)
        .post('/api/user/signup')
        .send({ email, password })
        .expect(201)

    const cookie = response.get('Set-Cookie')
    return cookie
}

beforeAll(async () => {
    process.env.JWT_KEY = 'Some_data'
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri)
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
})