const express = require('express');
const router = express.Router();

const produtosController = require('../controllers/produtos.controller');

router.post('/', produtosController.create);
router.get('/', produtosController.getAll);
router.get('/:id', produtosController.getById);
router.put('/:id', produtosController.update);
router.delete('/:id', produtosController.delete);

module.exports = router;