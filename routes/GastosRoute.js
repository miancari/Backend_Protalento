const express = require('express');
const router = express.Router();

const { getAllGastos, insertGasto, updateGastos, deleteGastos, getGastos } = require('../controllers/GastosControllers');

router.get('/', getAllGastos);
router.post('/', insertGasto);
router.put('/:id', updateGastos);
router.delete('/:id', deleteGastos);
router.get('/:id', getGastos);

module.exports = router;