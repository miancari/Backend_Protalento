const categoriaModel = require('../models/CategoriaDeGastos');

const getAllCategoria = (req, res) => {
    categoriaModel
        .getAllCategoria()
        .then(results => res.status(201).json(results))
        .catch(error => res.status(500).json(error))
}

const getCategoria = (req, res) => {
    const { id } = req.params
    categoriaModel
        .getCategoria(id)
        .then(results => res.status(201).json(results))
        .catch(error => res.status(500).json(error))
}

const insertCategoria = (req, res) => {
    const { nombre_categoria } = req.body
    categoriaModel
        .insertCategoria( { nombre_categoria } )
        .then(results => res.status(201).json({ message: '😏Categoria Ingresada Éxitosamente🎉😇'}))
        .catch(error => res.status(500).json(error))
}

const updateCategoria = (req, res) => {
    const { id } = req.params
    const { nombre_categoria } = req.body
    categoriaModel
        .updateCategoria(id, { nombre_categoria })
        .then(results => res.status(201).json({ message: '😏Categoria actualizada Éxitosamente🎉😇'}))
        .catch(error => res.status(500).json(error))
}

const deleteCategoria = (req, res) => {
    const { id } = req.params
    categoriaModel
        .deleteCategoria(id)
        .then(results => res.status(201).json({ message: '😏Categoria Eliminada Éxitosamente🎉😇'}))
        .catch(error => res.status(500).json(error))
}

const insertCategorias = (req, res) => res.status(200).send({
    message: "Categorias"
})

module.exports = {
    getAllCategoria,
    getCategoria,
    insertCategoria,
    updateCategoria,
    deleteCategoria,
    insertCategorias
}