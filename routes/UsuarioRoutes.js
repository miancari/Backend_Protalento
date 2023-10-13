const express = require('express');
const router = express.Router();

const { getAllUsuarios, insertUsuario, updateUsuarios, deleteUsuarios, getUsuarios } = require('../controllers/UsuariosControllers');


router.get('/', getAllUsuarios);
router.post('/', insertUsuario);
router.put('/:usuario_id', updateUsuarios);
router.delete('/:usuario_id', deleteUsuarios);
router.get('/:usuario_id', getUsuarios);

module.exports = router;
