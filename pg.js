const {Pool} = require('pg');

const pool = new Pool({
    connectionString: process.env.DEV_DB_HOST,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = {pool};