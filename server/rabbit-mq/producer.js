const rabbitMQ = require('amqplib/callback_api')

function sendToQueue(msg) {
    rabbitMQ.connect('amqp://localhost', function(error, connection) {
      connection.createChannel(function(error, channel) {
        const queue = 'email'
        channel.assertQueue(queue, { durable: true })
        channel.sendToQueue(queue, new Buffer(JSON.stringify(msg)), { persistent: true })
      })
    })
}

module.exports = {
    sendToQueue
}