const connection = require('../knexfile')['development'];
const database = require('knex')(connection);

const getAllGastos = () => {
    return database('Gastos');
}

const getGastos = (idgastos) => {
    return database('Gastos')
    .where( { id:idgastos } )
    .first();
}

const insertGastos = (gastos) => {
    return database('Gastos')
    .insert(gastos);
}

const updateGastos = (idgastos, gastos) => {
    return database('Gastos')
    .where('id', '=', idgastos)
    .update(gastos)
}

const deleteGastos = (idgastos) => {
    return database('Gastos')
    .where('id', '=', idgastos)
    .del()
}

module.exports = {
    getAllGastos,
    getGastos,
    insertGastos,
    updateGastos,
    deleteGastos
}