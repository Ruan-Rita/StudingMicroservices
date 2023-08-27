import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app: Express = express()
app.use(bodyParser.json())

app.post('/events', async (req: Request, res: Response) => {
    const { data, type } = req.body

    console.log("chegou algo aqui: ", data, type);
    if (type === 'CommentCreated') {
        const status = String(String(data.content).toLocaleLowerCase()).includes('orange') ? 'rejected' : 'approved'

        await axios.post('http://event-bus-srv:4005/events', {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                content: data.content,
                status
            }
        })
    }
    res.send()
})

app.listen(4003, function () {
    console.log('Listening on 4003');
})