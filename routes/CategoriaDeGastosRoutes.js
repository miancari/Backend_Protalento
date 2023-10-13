const express = require('express');
const router = express.Router();

const { getAllCategoria, insertCategoria, updateCategoria, deleteCategoria, getCategoria } = require('../controllers/CategoriaDeGastosControllers');

router.get('/', getAllCategoria);
router.post('/', insertCategoria);
router.put('/:id', updateCategoria);
router.delete('/:id', deleteCategoria);
router.get('/:id', getCategoria);

module.exports = router;