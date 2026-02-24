module.exports = (err, req, res, next) => {
    console.error(err);

    // Erro de duplicidade MySQL
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
            sucesso: false,
            erro: 'Registro duplicado'
        });
    }

    // Erro com status definido (ex: 404)
    if (err.status) {
        return res.status(err.status).json({
            sucesso: false,
            erro: err.message
        });
    }

    // Erro padrão
    res.status(500).json({
        sucesso: false,
        erro: 'Erro interno do servidor'
    });
};