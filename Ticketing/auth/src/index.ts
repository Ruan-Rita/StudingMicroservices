import express from "express";
import { json } from 'body-parser'

const app = express()
app.use(json())

app.get('/rita', (req, res) => {
    console.log("Receive data");

    res.json({
        ruan: "name"
    })

})

app.listen(3000, function () {
    console.log('Listennig on port 3000');
})