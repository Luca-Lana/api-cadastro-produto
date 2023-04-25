/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('produtos', (table) => {
    table.increments('id').primary()
    table.string('nome', 65).notNullable()
    table.decimal('preco', 8, 2).notNullable()
    table.string('marca', 65).notNullable().unique()

  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('produtos')
}
