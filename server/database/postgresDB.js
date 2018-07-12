const pg = require('pg')

// All of these should be env variables
const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: '127.0.0.1',
    database: 'scraper',
    password: '123',
    port: '5432'
})

module.exports = pool