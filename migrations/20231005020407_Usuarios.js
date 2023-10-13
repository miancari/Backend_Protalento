/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('Usuarios').then((exists) => {
        if (!exists) {
            return knex.schema.createTable("Usuarios", function (table) {
                table.increments('usuario_id').primary();
                table.string('nombre').notNullable();
                table.string('apellido').notNullable();
                table.string('correo_electronico').notNullable().unique();
                table.string('contraseña').notNullable().
                table.timestamp('fecha').defaultTo(knex.fn.now());
            });
        };
    });
};



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('Usuarios');
};
