import mongoose from "mongoose";
import app from "./app";

const startUp = async () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
        if (!process.env.JWT_KEY) {
            throw new Error('JWT_KEY must be defined')
        }
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth-db')
        console.log('Connected to MongoDB!');

        app.listen(3000, function () {
            console.log('Listennig on port 3000 !!');
        })
    } catch (error) {
        console.error(error);
    }
}

startUp()