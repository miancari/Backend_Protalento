const connection = require('../knexfile')['development'];
const database = require('knex')(connection);

const getAllUsuarios = () => {
    return database('Usuarios')
}

const getUsuarios = (idusuarios) => {
    return database('Usuarios')
    .where( { usuario_id:idusuarios } )
    .first()
}

const insertUsuarios = (usuarios) => {
    return database('Usuarios')
    .insert(usuarios)
}

const updateUsuarios = (idusuarios, usuarios) => {
    return database('Usuarios')
    .where('usuario_id', '=', idusuarios)
    .update(usuarios)
}

const deleteUsuarios = (idusuarios) => {
    return database('Usuarios')
    .where('usuario_id', '=', idusuarios)
    .del()
}

module.exports = {
    getAllUsuarios,
    getUsuarios,
    insertUsuarios,
    updateUsuarios,
    deleteUsuarios 
}