const express = require('express')
const axios = require('axios')
const bodyParse = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParse.json())
app.use(cors())

const posts = {}
const handleEvent = (type, data) => {

    if (type === 'PostCreated') {
        const { id, title } = data
        posts[id] = { id, title, comments: [] }
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data
        posts[postId].comments.push({ id, content, status })
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data
        const post = posts[postId]
        let index
        const comment = post.comments.find((comment, ind) => {
            index = ind
            return comment.id === id
        })
        comment.status = status
        comment.content = content

        posts[postId].comments[index] = comment
    }
}

app.get('/posts', function (req, res) {
    res.send(posts)
})

app.post('/events', function (req, res) {
    const { type, data } = req.body
    try {
        handleEvent(type, data)

        console.log("POSTS: ", posts);
    } catch (e) {
        console.log('Errao', e.message);
    }
    res.status(200).send()

})

app.listen(4002, async function () {
    console.log('Listening on 4002');

    const response = await axios.get('http://event-bus-srv:4005/events')

    for (event of response.data) {
        console.log('Processing event:', event.type);
        handleEvent(event.type, event.data)
    }
})