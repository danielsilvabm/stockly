const authService = require('../services/auth.service');

async function registrar(req, res, next) {
  try {
    const usuario = await authService.registrar(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const resultado = await authService.login(req.body);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  registrar,
  login,
};

