const ingresosModel = require('../models/Ingresos');

const getAllIngresos = (req, res) => {
    ingresosModel
    .getAllIngresos()
    .then(results => res.status(201).json(results))
    .catch(error => res.status(500).json(error))
}

const getIngresos = (req, res) => {
    const { ingresos_id } = req.params
    ingresosModel
        .getIngresos(ingresos_id)
        .then(results => res.status(201).json(results))
        .catch(error => res.status(500).json(error))
}

const insertIngreso = (req, res) => {
    const { usuario_id, fuente, monto, fecha } = req.body
    ingresosModel
    .insertIngresos({ usuario_id, fuente, monto, fecha })
    .then(results => res.status(201).json({ message: '😏Ingreso Álmacenado Éxitosamente🎉😇'}))
    .catch(error => res.status(500).json(error))
}

const updateIngresos = (req, res) => {
    const { ingresos_id } = req.params
    const { usuario_id, fuente, monto, fecha } = req.body

    ingresosModel
    .updateIngresos(ingresos_id, { usuario_id, fuente, monto, fecha })
    .then(results => res.status(201).json({ message: '😏Ingreso Actualizado Éxitosamente🎉😇'}))
    .catch(error => res.status(500).json({message:'error en update'}))
}

const deleteIngresos = (req, res) => {
    const { ingresos_id } = req.params
    ingresosModel
        .deleteIngresos(ingresos_id)
        .then(results => res.status(201).json({ message: '😏Ingreso Eliminado Éxitosamente🎉😇'}))
        .catch(error => res.status(500).json( { message:'error en delete'}))
}

const insertIngresos = (req, res) => res.status(200).send({
    message: "Ingresos"
})

module.exports = {
    getAllIngresos,
    getIngresos,
    insertIngreso,
    updateIngresos,
    deleteIngresos,
    insertIngresos
}