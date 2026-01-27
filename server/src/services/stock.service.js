const productService = require('./product.service');
const AppError = require('../utils/AppError');

// MOCK MOVEMENT REPOSITORY
const mockMovements = [];

class StockService {
    async registerEntry({ productId, quantity, userId, reason }) {
        if (quantity <= 0) throw new AppError('A quantidade deve ser maior que zero', 400);

        // 1. Update Product Stock
        const updatedProduct = await productService.updateProductStock(productId, quantity, 'entry');

        // 2. Log Movement
        const movement = {
            id: mockMovements.length + 1,
            type: 'ENTRY',
            productId,
            quantity,
            userId,
            reason,
            date: new Date()
        };
        mockMovements.push(movement);

        return { movement, product: updatedProduct };
    }

    async registerExit({ productId, quantity, userId, reason }) {
        if (quantity <= 0) throw new AppError('A quantidade deve ser maior que zero', 400);

        // 1. Update Product Stock (Validation happens inside productService)
        const updatedProduct = await productService.updateProductStock(productId, quantity, 'exit');

        // 2. Log Movement
        const movement = {
            id: mockMovements.length + 1,
            type: 'EXIT',
            productId,
            quantity,
            userId,
            reason,
            date: new Date()
        };
        mockMovements.push(movement);

        return { movement, product: updatedProduct };
    }

    async getMovements() {
        return mockMovements;
    }
}

module.exports = new StockService();
