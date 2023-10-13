const usuariosModel = require('../models/Usuarios');

const getAllUsuarios = (req, res) => {
    usuariosModel
        .getAllUsuarios()
        .then(results => res.status(201).json(results))
        .catch(error => res.status(500).json(error))
}

const getUsuarios = (req, res) => {
    const { usuario_id } = req.params
    usuariosModel
        .getUsuarios(usuario_id)
        .then(results => res.status(201).json(results))
        .catch(error => res.status(500).json(error))
}

const insertUsuario = (req, res) => {
    const { nombre, apellido, correo_electronico, contraseña, fecha } = req.body
    usuariosModel
    .insertUsuarios({ nombre, apellido, correo_electronico, contraseña, fecha })
    .then(results => res.status(201).json({ message: '😏Usuario Ingresado Éxitosamente🎉😇'}))
    .catch(error => res.status(500).json(error))
}

const updateUsuarios = (req, res) => {
    const { usuario_id } = req.params
    const { nombre, apellido, correo_electronico, contraseña, fecha } = req.body
    usuariosModel
    .updateUsuarios(usuario_id, { nombre, apellido, correo_electronico, contraseña, fecha })
    .then(results => res.status(201).json({ message: '😏Usuario Actualizado Éxitosamente🎉😇'}))
    .catch(error => res.status(500).json(error))
}

const deleteUsuarios = (req, res) => {
    const { usuario_id } = req.params
    usuariosModel
        .deleteUsuarios(usuario_id)
        .then(results => res.status(201).json({ message: '😏Usuario Eliminado Éxitosamente🎉😇'}))
        .catch(error => res.status(500).json(error))
}

const insertUsuarios = (req, res) => res.status(200).send({
    message: "Usuarios"
})

module.exports = {
    getAllUsuarios,
    getUsuarios,
    insertUsuario,
    updateUsuarios,
    deleteUsuarios,
    insertUsuarios
}