var express = require('express');
var router = express.Router();

var controladorInsertar = require('../controllers/controladorCrear');
var controladorTodos = require('../controllers/controladorTodos');
var controladorDinamico = require('../controllers/controladorDinamico');
var controladorTop = require('../controllers/controladorTopLibros');
var controladorActualizar = require('../controllers/controladorActualizar');
var controladorEliminar = require('../controllers/controladorEliminar');

router.post('/cliente/create', controladorInsertar.crear);
router.get('/cliente/all', controladorTodos.buscarTodos);
router.get('/cliente/dinamic', controladorDinamico.dinamico);
router.get('/cliente/top', controladorTop.top);
router.put('/cliente/update/:id', controladorActualizar.actualizar);
router.delete('/cliente/delete/:id', controladorEliminar.eliminar);

module.exports = router;
