const stockService = require('../services/stock.service');

exports.entry = async (req, res, next) => {
    try {
        const { productId, quantity, reason } = req.body;
        // Assuming req.user is set by auth middleware
        const result = await stockService.registerEntry({
            productId,
            quantity: parseInt(quantity),
            userId: req.user.id,
            reason
        });

        res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (err) {
        next(err);
    }
};

exports.exit = async (req, res, next) => {
    try {
        const { productId, quantity, reason } = req.body;
        const result = await stockService.registerExit({
            productId,
            quantity: parseInt(quantity),
            userId: req.user.id,
            reason
        });

        res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (err) {
        next(err);
    }
};

exports.getMovements = async (req, res, next) => {
    try {
        const movements = await stockService.getMovements();
        res.status(200).json({
            status: 'success',
            results: movements.length,
            data: { movements }
        });
    } catch (err) {
        next(err);
    }
}
