const gastosModel = require('../models/Gastos');

const getAllGastos = (req, res) => {
    gastosModel
        .getAllGastos()
        .then(results => res.status(201).json(results))
        .catch(error => res.status(500).json(error))
}

const getGastos = (req, res) => {
    const { id } = req.params
    gastosModel
        .getGastos(id)
        .then(results => res.status(201).json(results))
        .catch(error => res.status(500).json(error))
}

const insertGasto = (req, res) => {
    const { usuarioid, categoria_id, monto, descripcion, fecha } = req.body
    gastosModel
    .insertGastos({usuarioid, categoria_id, monto, descripcion, fecha})
    .then(results => res.status(201).json({ message: '😏Gasto Ingresado Éxitosamente🎉😇'}))
    .catch(error => res.status(500).json(error))
}

const updateGastos = (req, res) => {
    const { id } = req.params
    const { usuarioid, categoria_id, monto, descripcion, fecha } = req.body

    gastosModel
        .updateGastos(id, {usuarioid, categoria_id, monto, descripcion, fecha})
        .then(results => res.status(201).json({ message: '😏Gasto Actualizado Éxitosamente🎉😇'}))
        .catch(error => res.status(500).json(error))
}

const deleteGastos = (req, res) => {
    const { id } = req.params
    gastosModel
        .deleteGastos(id)
        .then(results => res.status(201).json({message: 'Gasto Eliminado Éxitosamente'}))
        .catch(error => res.status(500).json(error))
}

const insertGastos = (req, res) => res.status(200).send({
    message: 'Gastos'
})

module.exports = {
    getAllGastos,
    getGastos,
    insertGasto,
    updateGastos,
    deleteGastos,
    insertGastos
}