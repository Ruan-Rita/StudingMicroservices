const express = require('express')
const bodyParse = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParse.json())
app.use(cors())

const posts = {}

app.get('/posts', function (req, res) {
    console.log('OQOWQWOQOWOQWOWQOQWO', posts);
    res.send(posts)
})

app.post('/events', function (req, res) {
    const { type, data } = req.body
    try {
        if (type === 'PostCreated') {
            const { id, title } = data
            posts[id] = { id, title, comments: [] }
        }

        if (type === 'CommentCreated') {
            const { id, content, postId } = data
            console.log("ID DO CONTENT", content);
            console.log("ID DO CORNO", id, postId, posts[postId]);
            posts[postId].comments.push({ id, content })
        }

        console.log("POSTS: ", posts);
    } catch (e) {
        console.log('Errao', e.message);
    }
    res.status(200).send()

})

app.listen(4002, function () {
    console.log('Listening on 4002');
})