const express = require('express');
const router = express.Router();

const produtosController = require('../controllers/produtos.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.post('/', produtosController.create);
router.get('/', produtosController.getAll);
router.get('/:id', produtosController.getById);
router.put('/:id', produtosController.update);
router.delete('/:id', produtosController.delete);

module.exports = router;