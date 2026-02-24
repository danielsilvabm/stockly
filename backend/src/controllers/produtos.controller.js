const ProdutosService = require('../services/produtos.service');
const asyncHandler = require('../middlewares/asyncHandler');

// Criar
exports.create = asyncHandler(async (req, res) => {
    const result = await ProdutosService.createFerramenta(req.body);

    

    res.status(201).json({
        sucesso: true,
        mensagem: 'Ferramenta criada com sucesso',
        id: result.insertId
    });
});

// Listar
exports.getAll = asyncHandler(async (req, res) => {
    const ferramentas = await ProdutosService.listarFerramentas();

    res.json({
        sucesso: true,
        dados: ferramentas
    });
});

// Buscar por ID
exports.getById = asyncHandler(async (req, res) => {
    const ferramenta = await ProdutosService.buscarPorId(req.params.id);

    res.json({
        sucesso: true,
        dados: ferramenta
    });
});

// Atualizar
exports.update = asyncHandler(async (req, res) => {
    await ProdutosService.atualizarFerramenta(req.params.id, req.body);

    res.json({
        sucesso: true,
        mensagem: 'Ferramenta atualizada com sucesso'
    });
});

// Deletar
exports.delete = asyncHandler(async (req, res) => {
    await ProdutosService.deletarFerramenta(req.params.id);

    res.json({
        sucesso: true,
        mensagem: 'Ferramenta removida com sucesso'
    });
});

