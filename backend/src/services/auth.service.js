const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuariosModel = require('../models/usuarios.model');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

async function registrar({ nome, email, senha }) {
  if (!nome || !email || !senha) {
    const err = new Error('Nome, email e senha são obrigatórios');
    err.status = 400;
    throw err;
  }

  const existente = await usuariosModel.buscarPorEmail(email);

  if (existente) {
    const err = new Error('E-mail já cadastrado');
    err.status = 400;
    throw err;
  }

  const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

  const id = await usuariosModel.criar({
    nome: nome.trim(),
    email: email.trim().toLowerCase(),
    senha: senhaHash,
  });

  return {
    id,
    nome: nome.trim(),
    email: email.trim().toLowerCase(),
  };
}

async function login({ email, senha }) {
  if (!email || !senha) {
    const err = new Error('Email e senha são obrigatórios');
    err.status = 400;
    throw err;
  }

  const usuario = await usuariosModel.buscarPorEmail(email.trim().toLowerCase());

  if (!usuario) {
    const err = new Error('Credenciais inválidas');
    err.status = 401;
    throw err;
  }

  const senhaConfere = await bcrypt.compare(senha, usuario.senha);

  if (!senhaConfere) {
    const err = new Error('Credenciais inválidas');
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
  };
}

module.exports = {
  registrar,
  login,
};

