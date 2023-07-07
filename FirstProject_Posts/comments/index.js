const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const app = express()

// settings
app.use(bodyParser.json())

// datas
const commentsByPostId = []
// routes 
app.get('/posts/:id/comments', function (req, res) {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', function (req, res) {
    const id = randomBytes(4).toString('hex')
    const { content } = req.body

    const comments = commentsByPostId[req.params.id] || []
    const newComment = { id, content }

    comments.push(newComment)
    commentsByPostId[req.params.id] = comments

    return res.status(201).send(newComment)
})

// start application
app.listen(4001, function () {
    console.log('Listening on 4001');
})