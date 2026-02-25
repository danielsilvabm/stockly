const db = require('../config/db');

// Buscar ferramenta com lock (FOR UPDATE)
async function buscarFerramentaPorId(ferramenta_id, connection) {
  const [rows] = await connection.query(
    'SELECT * FROM ferramentas WHERE id = ? FOR UPDATE',
    [ferramenta_id]
  );

  return rows;
}

// Atualizar quantidade
async function atualizarQuantidade(ferramenta_id, novaQuantidade, connection) {
  await connection.query(
    'UPDATE ferramentas SET quantidade = ? WHERE id = ?',
    [novaQuantidade, ferramenta_id]
  );
}

// Inserir movimentação
async function inserirMovimentacao(
  ferramenta_id,
  tipo,
  quantidade,
  responsavel,
  connection
) {
  await connection.query(
    'INSERT INTO movimentacoes (ferramenta_id, tipo, quantidade, responsavel, data) VALUES (?, ?, ?, ?, NOW())',
    [ferramenta_id, tipo, quantidade, responsavel]
  );
}

// Listar movimentações
async function listarMovimentacoes() {
  const [rows] = await db.query(`
    SELECT 
      m.id,
      m.tipo,
      m.quantidade,
      m.responsavel,
      m.data,
      f.nome AS ferramenta_nome
    FROM movimentacoes m
    JOIN ferramentas f ON m.ferramenta_id = f.id
    ORDER BY m.data DESC
  `);

  return rows;
}

module.exports = {
  buscarFerramentaPorId,
  atualizarQuantidade,
  inserirMovimentacao,
  listarMovimentacoes
};