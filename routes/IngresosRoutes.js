const express = require('express');
const { getAllIngresos, insertIngreso, updateIngresos, deleteIngresos, getIngresos } = require('../controllers/IngresosControllers');

const router = express.Router();

router.get('/', getAllIngresos);
router.post('/', insertIngreso);
router.put('/:ingresos_id', updateIngresos);
router.delete('/:ingresos_id', deleteIngresos);
router.get('/:ingresos_id', getIngresos);

module.exports = router;