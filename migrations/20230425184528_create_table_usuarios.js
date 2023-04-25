/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('usuarios', (table) => {
    table.increments('id').primary()
    table.string('nome', 75).notNullable()
    table.string('email', 50).notNullable().unique()
    table.string('senha', 60).notNullable()
    table.string('token', 200)
    table.string('token_expira_em', 50)

  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('usuarios')
}
