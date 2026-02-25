const express = require('express');
const router = express.Router();

const movimentacoesController = require('../controllers/movimentacoes.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.post('/', movimentacoesController.criarMovimentacao);
router.get('/', movimentacoesController.listarMovimentacoes);

module.exports = router;