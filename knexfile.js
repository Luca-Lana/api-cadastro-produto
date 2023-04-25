const env = require('./config')
module.exports = {
  client: 'mysql2',
  connection: {
    host : env.DATABASE_HOST,
    port : env.DATABASE_PORT,
    user : env.DATABASE_USER,
    password : env.DATABASE_PASSWORD,
    database : env.DATABASE_NAME
  },
  migrations : {
    tableName : 'knex_migrations'
  }
}