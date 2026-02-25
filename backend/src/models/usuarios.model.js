const db = require('../config/db');

async function criar({ nome, email, senha }) {
  const sql = `
    INSERT INTO usuarios (nome, email, senha)
    VALUES (?, ?, ?)
  `;

  const [result] = await db.query(sql, [nome, email, senha]);

  return result.insertId;
}

async function buscarPorEmail(email) {
  const [rows] = await db.query(
    'SELECT id, nome, email, senha FROM usuarios WHERE email = ?',
    [email]
  );

  if (!rows || rows.length === 0) {
    return null;
  }

  return rows[0];
}

module.exports = {
  criar,
  buscarPorEmail,
};

