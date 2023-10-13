/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable('Gastos').then((exists) => {
        if(!exists) {
            return knex.schema.createTable('Gastos', function (table) {
                table.increments('id').primary();
                table.integer('usuarioid').unsigned().notNullable();
                table.foreign('usuarioid').references('usuario_id').inTable('Usuarios');
                table.integer('categoria_id').unsigned().notNullable();
                table.foreign('categoria_id').references('id').inTable('CategoriaDeGastos');
                table.decimal('monto', 10, 2);
                table.text('descripcion');
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

};
