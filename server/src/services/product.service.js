const AppError = require('../utils/AppError');

// MOCK PRODUCT REPOSITORY (Simulated DB)
let mockProducts = [
    { id: 1, name: 'Laptop Dell XPS', sku: 'DELL-XPS-13', stock: 10, price: 1200 },
    { id: 2, name: 'Logitech Mouse', sku: 'LOG-M-500', stock: 50, price: 25 },
];

class ProductService {
    async getAllProducts() {
        return mockProducts;
    }

    async getProductById(id) {
        const product = mockProducts.find(p => p.id === parseInt(id));
        if (!product) {
            throw new AppError('Produto não encontrado', 404);
        }
        return product;
    }

    async createProduct(data) {
        const newProduct = {
            id: mockProducts.length + 1,
            ...data,
            stock: data.stock || 0
        };
        mockProducts.push(newProduct);
        return newProduct;
    }

    // Internal method for StockService to use
    async updateProductStock(id, quantity, type) {
        const product = await this.getProductById(id);

        if (type === 'exit') {
            if (product.stock < quantity) {
                throw new AppError(`Estoque insuficiente para o produto ${product.name}. Atual: ${product.stock}, Solicitado: ${quantity}`, 400);
            }
            product.stock -= quantity;
        } else if (type === 'entry') {
            product.stock += quantity;
        }

        return product;
    }
}

module.exports = new ProductService();
