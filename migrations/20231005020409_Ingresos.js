/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable('Ingresos').then((exists) => {
        if(!exists) {
            return knex.schema.createTable("Ingresos", function (table) {
                table.increments('ingresos_id').primary();
                table.integer('usuario_id').unsigned().notNullable();
                table.foreign('usuario_id').references('usuario_id').inTable('Usuarios');
                table.string('fuente').notNullable();
                table.decimal('monto', 10, 2).notNullable();
                table.dateTime('fecha').defaultTo(knex.fn.now());
            })
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Ingresos');
};
