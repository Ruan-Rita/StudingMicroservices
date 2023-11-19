import express from "express";
import { json } from 'body-parser'
import { currentUserRoutes } from "./routes/current-user";
import { signinRoutes } from "./routes/signin";
import { signoutRoutes } from "./routes/signout";
import { signupRoutes } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import cookieSession from "cookie-session";
import 'express-async-errors'
import mongoose from "mongoose";

const app = express()
app.set('trust proxy', true) // ingress engine x
app.use(cookieSession({
    signed: false,
    secure: true
}))

app.use(json())

app.use(currentUserRoutes)
app.use(signinRoutes)
app.use(signoutRoutes)
app.use(signupRoutes)

app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler)

const startUp = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth-db')
        console.info('Connected to MongoDB!');

        app.listen(3000, function () {
            console.log('Listennig on port 3000 !!');
        })
    } catch (error) {
        console.error(error);
    }
}

startUp()