/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable('categoriaDeGastos').then((exists) => {
        if(!exists) {
            return knex.schema.createTable("CategoriaDeGastos", function(table) {
                table.increments('id').primary();
                table.string('nombre_categoria').notNullable();
                table.timestamp(true, true);
            });
        };
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

};
