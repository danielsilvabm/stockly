const ProdutosModel = require('../models/produtos.model');

// Criar
exports.createFerramenta = async (data) => {
  if (!data.nome || !data.codigo) {
    throw new Error('Nome e código são obrigatórios');
  }

  const payload = {
    nome: data.nome,
    codigo: data.codigo,
    descricao: data.descricao || '',
    categoria: data.categoria || '',
    quantidade:
      typeof data.quantidade === 'number'
        ? data.quantidade
        : Number(data.quantidade) || 0,
  };

  return await ProdutosModel.criar(payload);
};

// Listar
exports.listarFerramentas = async () => {
  return await ProdutosModel.listar();
};

// Buscar
exports.buscarPorId = async (id) => {
  const result = await ProdutosModel.buscarPorId(id);

  if (result.length === 0) {
    const error = new Error('Ferramenta não encontrada');
    error.status = 404;
    throw error;
  }

  return result[0];
};

// Atualizar
exports.atualizarFerramenta = async (id, data) => {
  const result = await ProdutosModel.atualizar(id, data);

  if (result.affectedRows === 0) {
    const error = new Error('Ferramenta não encontrada');
    error.status = 404;
    throw error;
  }

  return result;
};

// Deletar
exports.deletarFerramenta = async (id) => {
  const result = await ProdutosModel.deletar(id);

  if (result.affectedRows === 0) {
    const error = new Error('Ferramenta não encontrada');
    error.status = 404;
    throw error;
  }

  return result;
};