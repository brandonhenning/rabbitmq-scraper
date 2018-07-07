require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const port = process.env.PORT || 5000
const db = require('./database/saveToDatabase')
const rabbitMQ = require('./rabbit-mq/producer')

const app = express()
app.use(cors())
app.use(morgan('tiny'))

db.createTables()

app.get('/search/:location/:searchTerm/:email', (request, response) => {
    rabbitMQ.sendToQueue(request.params)
    return response.json({ message: 'Thank you! Your request is processsing!' })
})

app.use((request, response, next) => {
    const error = new Error('not found')
    response.status(404)
    next(error)
})

app.use((error, request, response, next) => {
    response.status(response.statusCode || 500)
    response.json({
        message: error.message
    })
})

app.listen(port)


