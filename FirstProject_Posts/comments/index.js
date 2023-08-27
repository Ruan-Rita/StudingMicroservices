const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const axios = require('axios')
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
    const newComment = { id, content, status: 'pending' }
    console.log("STORE new comment !", newComment);
    console.log("Comments by posts", commentsByPostId);
    console.log("Current Comments by posts", comments);
    comments.push(newComment)
    commentsByPostId[req.params.id] = comments

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            content,
            postId: req.params.id,
            id,
            status: 'pending'
        }
    }).catch(e => console.log(e.message))

    res.status(201).send(newComment)
})

app.post('/events', async function (req, res) {
    console.log('Event Received: ', req.body.type)
    const { data, type } = req.body

    if (type === 'CommentModerated') {
        const { id, postId, status } = data
        const comments = commentsByPostId[postId]
        const comment = comments.find(comment => comment.id = id)

        comment.status = status
        commentsByPostId[postId].push(comment)

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                status: comment.status,
                content: comment.content
            }
        })
    }
    res.status(200).send()
})

// start application
app.listen(4001, function () {
    console.log('Listening on 4001');
})