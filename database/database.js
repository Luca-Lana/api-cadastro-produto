const env = require('../config')
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : env.DATABASE_HOST,
    port : env.DATABASE_PORT,
    user : env.DATABASE_USER,
    password : env.DATABASE_PASSWORD,
    database : env.DATABASE_NAME
  }
})

module.exports = knex