const connection = require('../knexfile')['development'];
const database = require('knex')(connection);

const getAllCategoria = () => {
    return database('CategoriaDeGastos');
}

const getCategoria = (idcategoria) => {
    return database('CategoriaDeGastos')
    .where( { id:idcategoria} )
    .first();
}

const insertCategoria = (categoria) => {
    return database('CategoriaDeGastos')
        .insert(categoria);
}

const updateCategoria = (idcategoria, categoria) => {
    return database('CategoriaDeGastos')
        .where('id', '=', idcategoria)
        .update(categoria)
}

const deleteCategoria = (idcategoria) => {
    return database ('CategoriaDeGastos')
        .where('id', '=', idcategoria)
        .del()
}

module.exports = {
    getAllCategoria,
    getCategoria,
    insertCategoria,
    deleteCategoria,
    updateCategoria
}