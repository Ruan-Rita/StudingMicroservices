const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const app = express()

// settings
app.use(bodyParser.json())

// datas
const posts = []
// routes 
app.get('/posts', function (req, res) {
    res.send(posts)
})

app.post('/posts', function (req, res) {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body
    posts.push({
        id,
        title
    })
    res.status(201).send(posts[posts.length - 1])
})

// start application
app.listen(4000, function () {
    console.log('Listening on 4000');
})