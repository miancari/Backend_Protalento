const connection = require('../knexfile')['development'];
const database = require('knex')(connection);

const getAllIngresos = () => {
    return database('Ingresos');
}

const getIngresos = (idingresos) => {
    return database('Ingresos')
    .where( { ingresos_id:idingresos } )
    .first()
}

const insertIngresos = (ingresos) => {
    return database('Ingresos')
    .insert(ingresos)
}

const updateIngresos = (idingresos, ingresos) => {
    return database('Ingresos')
    .where('ingresos_id', '=', idingresos)
    .update(ingresos)
}

const deleteIngresos = (idingresos) => {
    return database('Ingresos')
    .where('ingresos_id', '=', idingresos)
    .del()
}

module.exports = {
    getAllIngresos,
    getIngresos,
    insertIngresos,
    updateIngresos,
    deleteIngresos
}