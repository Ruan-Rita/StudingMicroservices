const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

const events = []

app.post('/events', function (req, res) {
    const event = req.body
    events.push(event)

    axios.post('http://127.0.0.1:4000/events', event).catch(e => console.log("[post]" + e.message))
    axios.post('http://127.0.0.1:4001/events', event).catch(e => console.log("[comment]" + e.message))
    axios.post('http://127.0.0.1:4002/events', event).catch(e => console.log("[query]" + e.message))
    axios.post('http://127.0.0.1:4003/events', event).catch(e => console.log("[moderation]" + e.message))

    res.send({
        status: 'OK'
    })
})
app.get('/events', function (req, res) {
    res.send(events)
})

app.listen(4005, () => {
    console.log('Listening on 4005');
})