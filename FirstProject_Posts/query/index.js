const express = require('express')
const bodyParse = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParse.json())
app.use(cors())


app.get('/posts', function (req, res) {

})

app.post('/events', function (req, res) {

})

app.listen(4002, function () {
    console.log('Listening on 4002');
})