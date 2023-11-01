import express, { Request, Response } from "express";
import { json } from 'body-parser'
import { Routes } from "./routes";

const app = express()
app.use(json())
Routes(app, '/users')

app.listen(3000, function () {
    console.log('Listennig on port 3000 !!');
    console.log('Listennig on port 3000 !!');
    console.log('Listennig on port 3000 !!');
})