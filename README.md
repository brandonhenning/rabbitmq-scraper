# RabbitMQ Craigslist Emailer

## What This Is
Node server-side application that accepts a search term, location, and email then scrapes Craigslist for listings and emails the user a results list and stores the seach in a Postgres database. 

RabbitMQ is used to queue scraping tasks and to send the results in an email and store the data to Postgres. PM2 is used to run both the Express server as well as the RabbitMQ server from inside the same application and to provide load balancing. 

### Technologies Used
- [Node.js](https://nodejs.org/en/)
- [RabbitMQ](https://www.rabbitmq.com/) - For queueing scrape requests and emailing tasks
- [PM2](http://pm2.keymetrics.io/) - For running both the Express server as well as the RabbitMQ server and load balancing
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Express](https://expressjs.com/) - Web server for receiving search requests
- [Nodemailer.js](https://nodemailer.com/about/) - npm library for sending emails from a Node.js server


#### Issues in Progress
1) Return better response messages to user if no Craigslist results are found (I am still trying to figure out how to return response messages from a RabbitMQ queue)
2) Overall cleaner code and smaller functions. 
3) Build in implementation of daily batching of email requests to send new listings to users who have selected to be emailed. This would be an ideal implementation of Rabbit. 
4) I'm open to other suggestions. This is my first RabbitMQ project but loving it so far!