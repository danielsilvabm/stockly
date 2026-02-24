const movimentacoesService = require('../services/movimentacoes.service');

async function criarMovimentacao(req, res, next) {
  try {
    const resultado = await movimentacoesService.criarMovimentacao(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    next(error);
  }
}

async function listarMovimentacoes(req, res, next) {
  try {
    const movimentacoes = await movimentacoesService.listarMovimentacoes();
    res.json(movimentacoes);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  criarMovimentacao,
  listarMovimentacoes
};