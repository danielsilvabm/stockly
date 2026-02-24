const express = require('express');
const router = express.Router();

const movimentacoesController = require('../controllers/movimentacoes.controller');

router.post('/', movimentacoesController.criarMovimentacao);
router.get('/', movimentacoesController.listarMovimentacoes);

module.exports = router;