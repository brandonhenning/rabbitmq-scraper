const rabbitMQ = require('amqplib/callback_api')
const craigslist = require('../craigslistHandler')
const mailHandler = require('../mailHandler')
const fetch = require('node-fetch')
const db = require('../database/saveToDatabase')


rabbitMQ.connect('amqp://localhost', function(error, connection) {
  connection.createChannel(function(error, channel) {
    const queue = 'email'
    channel.assertQueue(queue, { durable: true })
    channel.consume(queue, async function(msg) {
      let message = JSON.parse(msg.content)
      // This is the part where the worker calls a function to process the queue task
      await craigslistScrapeWaterfall(message)
      channel.ack(msg)
    }, { noAck: false })
  })
})

function craigslistScrapeWaterfall (message, response) {
    scrapeCraigslist(message)
        .then(results => sendEmail(results, message))
        .then(results => saveToDatabase(results, message))
}

function scrapeCraigslist (message) {
    const url = craigslist.getSearchParameters(message)
    return fetch(url)
        .then(response => response.text())
        .then(body => {
            return craigslist.getResults(body)})
}

function sendEmail (results, searchObject) {
    mailHandler.sendEmail(craigslist.formatResultsToHTML(results), searchObject.email)
    return results
}

function saveToDatabase (results, searchObject) {
    db.storeSearch(searchObject.location, searchObject.searchTerm, craigslist.setSearchDate(), searchObject.email, false)
    return results
}

