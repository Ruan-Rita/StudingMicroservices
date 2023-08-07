const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const { default: axios } = require('axios')
// settings
app.use(bodyParser.json())
app.use(cors())


// datas
const commentsByPostId = []
// routes 
app.get('/posts/:id/comments', function (req, res) {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async function (req, res) {
    const id = randomBytes(4).toString('hex')
    const { content } = req.body

    const comments = commentsByPostId[req.params.id] || []
    const newComment = { id, content }

    comments.push(newComment)
    commentsByPostId[req.params.id] = comments

    await axios.post('http://127.0.0.1:4005/events', {
        type: 'CommentCreated',
        data: {
            content,
            postId: req.params.id,
            id
        }
    })

    return res.status(201).send(newComment)
})

app.post('/events', function (req, res) {
    console.log('Event Received: ', req.body.type)
    res.status(200).send()
})

// start application
app.listen(4001, function () {
    console.log('Listening on 4001');
})