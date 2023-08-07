const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const App = express()
App.use(bodyParser.json())

App.post('/events', function (req, res) {
    const event = req.body

    axios.post('http://127.0.0.1:4000/events', event)
    axios.post('http://127.0.0.1:4001/events', event)
    // axios.post('http://127.0.0.1:4002/events', event)

    res.send({
        status: 'OK'
    })
})

App.listen(4005, () => {
    console.log('Listening on 4005');
})