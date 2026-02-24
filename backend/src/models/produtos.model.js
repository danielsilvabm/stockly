const connection = require('../config/db');

async function criar(dados) {
  const sql = `
    INSERT INTO ferramentas (nome, codigo, descricao, categoria, quantidade)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await connection.query(sql, [
    dados.nome,
    dados.codigo,
    dados.descricao,
    dados.categoria,
    dados.quantidade
  ]);

  return result;
}

async function listar() {
  const [rows] = await connection.query('SELECT * FROM ferramentas');
  return rows;
}

async function buscarPorId(id) {
  const [rows] = await connection.query(
    'SELECT * FROM ferramentas WHERE id = ?',
    [id]
  );
  return rows;
}

async function atualizar(id, dados) {
  const sql = `
    UPDATE ferramentas
    SET nome = ?, codigo = ?, descricao = ?, categoria = ?, quantidade = ?
    WHERE id = ?
  `;

  const [result] = await connection.query(sql, [
    dados.nome,
    dados.codigo,
    dados.descricao,
    dados.categoria,
    dados.quantidade,
    id
  ]);

  return result;
}

async function deletar(id) {
  const [result] = await connection.query(
    'DELETE FROM ferramentas WHERE id = ?',
    [id]
  );

  return result;
}

module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizar,
  deletar
};