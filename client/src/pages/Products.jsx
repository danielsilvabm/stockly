import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', sku: '', price: '' });

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data.data.products);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/products', {
                ...newProduct,
                price: parseFloat(newProduct.price)
            });
            setIsModalOpen(false);
            setNewProduct({ name: '', sku: '', price: '' });
            fetchProducts();
        } catch (err) {
            alert('Falha ao criar produto');
        }
    }

    return (
        <Layout>
            <div className="page-header">
                <h1>Gerenciador de Produtos</h1>
                <button className="primary-btn" onClick={() => setIsModalOpen(true)}>+ Adicionar Produto</button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>SKU</th>
                            <th>Preço</th>
                            <th>Estoque</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>#{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.sku}</td>
                                <td>${product.price}</td>
                                <td>
                                    <span className={`badge ${product.stock > 10 ? 'success' : 'warning'}`}>
                                        {product.stock}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Adicionar Novo Produto</h2>
                        <form onSubmit={handleCreate}>
                            <div className="form-group">
                                <label>Nome</label>
                                <input required value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>SKU</label>
                                <input required value={newProduct.sku} onChange={e => setNewProduct({ ...newProduct, sku: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Preço</label>
                                <input required type="number" step="0.01" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="ghost-btn" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                                <button type="submit" className="primary-btn">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }
        .table-container {
            background: var(--bg-white);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-sm);
            border: 1px solid var(--border-light);
            overflow: hidden;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            text-align: left;
            padding: 1rem 1.5rem;
            border-bottom: 1px solid var(--border-light);
            color: var(--text-secondary);
        }
        th {
            background: var(--bg-header);
            font-weight: 600;
            color: var(--text-secondary);
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        td {
            font-size: 0.9375rem;
            color: var(--text-main);
        }
        tr:last-child td {
            border-bottom: none;
        }
        tr:hover td {
            background-color: var(--bg-hover);
        }
        .badge {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
            line-height: 1;
        }
        .success { background: var(--success-bg); color: var(--success); }
        .warning { background: var(--warning-bg); color: var(--warning); }
        
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
        }
        .modal {
            background: var(--bg-white);
            padding: 2.5rem;
            border-radius: var(--radius-lg);
            width: 100%;
            max-width: 500px;
            box-shadow: var(--shadow-lg);
            animation: modalSlide 0.3s ease-out;
        }
        @keyframes modalSlide {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .modal h2 {
            margin-bottom: 1.5rem;
            font-size: 1.25rem;
        }
        .form-group {
            margin-bottom: 1.25rem;
        }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: var(--text-main);
            font-size: 0.875rem;
        }
        .form-group input {
            width: 100%;
        }
        .modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            margin-top: 2rem;
            border-top: 1px solid var(--border-light);
            padding-top: 1.5rem;
        }
      `}</style>
        </Layout>
    );
};

export default Products;
