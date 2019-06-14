require('dotenv').config()
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
      await processEmailRequest(message)
      channel.ack(msg)
    }, { noAck: false })
  })
})

// You are calling this with 'await' but function is not 'asnyc'
// as long as your using await/async in this project, it is better to continue doing so.
// also need to handle error
// response shouldn't be a variable if not being used.
const processEmailRequest = async (message) => {
  try {
    const results = await scrapeCraigslist(message);
    await sendEmail(results, message);
    await saveToDatabase(emailResults, message);
  } catch (err) {
    // TODO handle err
  }
}

const scrapeCraigslist = async (message) => {
    const url = craigslist.getSearchParameters(message)
    const response = await fetch(url);
    const body = await response.text();
    return craigslist.getResults(body)
}

const sendEmail = async (results, searchObject) => {
    await mailHandler.sendEmail(craigslist.formatResultsToHTML(results), searchObject.email)
}

const saveToDatabase = async (searchObject) => {
    await db.storeSearch(searchObject.location, searchObject.searchTerm, craigslist.setSearchDate(), searchObject.email, false)
}

