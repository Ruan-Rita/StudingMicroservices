const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
var cors = require('cors')

// settings
app.use(bodyParser.json())
app.use(cors())

// datas
const posts = []
// routes 
app.get('/posts', function (req, res) {
    res.send(posts)
})

app.post('/posts', async function (req, res) {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body
    posts.push({
        id,
        title
    })

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    })
    res.status(201).send(posts[posts.length - 1])
})

app.post('/events', function (req, res) {
    console.log('Event Received: ', req.body.type)
    res.status(200).send()
})

// start application
app.listen(4000, function () {
    console.log('Version: v55');
    console.log('Listening on 4000');
})