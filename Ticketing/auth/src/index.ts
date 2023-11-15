import express, { Request, Response } from "express";
import { json } from 'body-parser'
import { currentUserRoutes } from "./routes/current-user";
import { signinRoutes } from "./routes/signin";
import { signoutRoutes } from "./routes/signout";
import { signupRoutes } from "./routes/signup";

const app = express()
app.use(json())
app.use(currentUserRoutes)
app.use(signinRoutes)
app.use(signoutRoutes)
app.use(signupRoutes)

app.listen(3000, function () {
    console.log('Listennig on port 3000 !!');
    console.log('Listennig on port 3000 !!');
    console.log('Listennig on port 3000 !!');
})