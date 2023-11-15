import express from "express";
import { json } from 'body-parser'
import { currentUserRoutes } from "./routes/current-user";
import { signinRoutes } from "./routes/signin";
import { signoutRoutes } from "./routes/signout";
import { signupRoutes } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";

const app = express()
app.use(json())

app.use(currentUserRoutes)
app.use(signinRoutes)
app.use(signoutRoutes)
app.use(signupRoutes)

app.use(errorHandler)

app.listen(3000, function () {
    console.log('Listennig on port 3000 !!');
})