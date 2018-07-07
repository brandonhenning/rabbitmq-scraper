# RabbitMQ Craigslist Emailer

## What This Is
Node server-side application that accepts a search term and location and then scrapes Craigslist for listings and emails the user a results list and stores the seach in a Postgres database. RabbitMQ is used to queue scraping tasks and to send the results in an email and store the data to Postgres. 

### Technologies Used
- Node.js
- RabbitMQ
- Postgres
- Express
- Nodemailer.js

#### Issues in Progress
1) Separate out rabbit-mq/worker.js into separate server project so that it is stand-alone. 
2) Return better response messages to user if no Craigslist results are found (I am still trying to figure out how to return response messages from a RabbitMQ queue)
3) Overall cleaner code and smaller functions. 
4) Build in implementation of daily batching of email requests to send new listings to users who have selected to be emailed. This would be an ideal implementation of Rabbit. 
5) I'm open to other suggestions. This is my first RabbitMQ project but loving it so far!