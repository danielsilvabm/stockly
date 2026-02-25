const db = require('../config/db');
const movimentacoesModel = require('../models/movimentacoes.model');

/**
 * Criar movimentação (entrada ou saída)
 */
async function criarMovimentacao({ ferramenta_id, tipo, quantidade, responsavel }) {

  //  Validações básicas
  if (!ferramenta_id || !tipo || !quantidade || !responsavel) {
    throw new Error('Dados incompletos');
  }

  if (!['entrada', 'saida'].includes(tipo)) {
    throw new Error('Tipo deve ser entrada ou saida');
  }

  if (quantidade <= 0) {
    throw new Error('Quantidade deve ser maior que zero');
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    //  Lock da linha para evitar conflito
    const ferramenta = await movimentacoesModel.buscarFerramentaPorId(
      ferramenta_id,
      connection
    );
  

    if (ferramenta.length === 0) {
      throw new Error('Ferramenta não encontrada');
    }

    const ferramentaAtual = ferramenta[0];

    //  Validação de estoque
    if (tipo === 'saida' && ferramentaAtual.quantidade < quantidade) {
      throw new Error('Estoque insuficiente');
    }

    //  Calcular nova quantidade
    const novaQuantidade =
      tipo === 'entrada'
        ? ferramentaAtual.quantidade + quantidade
        : ferramentaAtual.quantidade - quantidade;

    //  Atualizar estoque
    await movimentacoesModel.atualizarQuantidade(
      ferramenta_id,
      novaQuantidade,
      connection
  );

    //  Registrar movimentação
    await movimentacoesModel.inserirMovimentacao(
      ferramenta_id,
      tipo,
      quantidade,
      responsavel,
      connection
    );

    await connection.commit();
    connection.release();

    return {
      message: 'Movimentação realizada com sucesso',
      novaQuantidade
    };

  } catch (error) {
    await connection.rollback();
    connection.release();
    throw error;
  }
}

module.exports = {
  criarMovimentacao,
  listarMovimentacoes: movimentacoesModel.listarMovimentacoes,
};