const configKnex = require('../knexfile')
const knex = require('knex')(configKnex)

module.exports = knex