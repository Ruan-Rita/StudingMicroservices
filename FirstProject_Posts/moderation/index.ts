import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app: Express = express()
app.use(bodyParser.json())

app.post('/parser-comment', (req: Request, res: Response) => {
    res.send()
})

app.listen(4003, function () {
    console.log('Listening on 4003');
})