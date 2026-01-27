import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

const StockMovements = () => {
    const [movements, setMovements] = useState([]);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({ productId: '', quantity: '', type: 'entry', reason: '' });

    const fetchData = async () => {
        try {
            const [movRes, prodRes] = await Promise.all([
                api.get('/stock/movements'),
                api.get('/products')
            ]);
            setMovements(movRes.data.data.movements);
            setProducts(prodRes.data.data.products);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = formData.type === 'entry' ? '/stock/entry' : '/stock/exit';
            await api.post(endpoint, {
                productId: formData.productId,
                quantity: parseInt(formData.quantity),
                reason: formData.reason
            });
            setFormData({ productId: '', quantity: '', type: 'entry', reason: '' });
            fetchData();
            alert('Movimentação registrada com sucesso');
        } catch (err) {
            alert(`Erro: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <Layout>
            <h1>Gestão de Estoque</h1>

            <div className="grid-layout">
                <div className="card form-card">
                    <h3>Registrar Movimentação</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Ação</label>
                            <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                <option value="entry">Entrada</option>
                                <option value="exit">Saída</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Produto</label>
                            <select required value={formData.productId} onChange={e => setFormData({ ...formData, productId: e.target.value })}>
                                <option value="">Selecione o Produto...</option>
                                {products.map(p => (
                                    <option key={p.id} value={p.id}>{p.name} (SKU: {p.sku})</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Quantidade</label>
                            <input required type="number" min="1" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Motivo / Observação</label>
                            <input required value={formData.reason} onChange={e => setFormData({ ...formData, reason: e.target.value })} placeholder="ex: Pedido de Compra #123" />
                        </div>
                        <button className="primary-btn full" type="submit">Confirmar Movimentação</button>
                    </form>
                </div>

                <div className="card list-card">
                    <h3>Movimentações Recentes</h3>
                    <div className="list-wrapper">
                        {movements.slice().reverse().map((mov) => (
                            <div key={mov.id} className="movement-item">
                                <div className={`indicator ${mov.type === 'ENTRY' ? 'in' : 'out'}`} />
                                <div className="mov-details">
                                    <strong>{products.find(p => p.id === parseInt(mov.productId))?.name || 'Produto Desconhecido'}</strong>
                                    <span>{mov.reason}</span>
                                </div>
                                <div className="mov-meta">
                                    <span className={mov.type === 'ENTRY' ? 'text-green' : 'text-red'}>
                                        {mov.type === 'ENTRY' ? '+' : '-'}{mov.quantity}
                                    </span>
                                    <small>{new Date(mov.date).toLocaleDateString()}</small>
                                </div>
                            </div>
                        ))}
                        {movements.length === 0 && <p className="empty-state">Nenhuma movimentação registrada.</p>}
                    </div>
                </div>
            </div>

            <style>{`
        .grid-layout {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 2rem;
            margin-top: 2rem;
        }
        @media (max-width: 1024px) {
            .grid-layout { grid-template-columns: 1fr; }
        }
        .card {
            background: var(--bg-white);
            padding: 2rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-sm);
            border: 1px solid var(--border-light);
            height: fit-content;
        }
        .card h3 {
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border-light);
            font-size: 1.125rem;
        }
        .form-group {
            margin-bottom: 1.25rem;
        }
        .form-group select, .form-group input {
            width: 100%;
        }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: var(--text-main);
            font-size: 0.875rem;
        }
        .primary-btn.full {
            width: 100%;
            margin-top: 1rem;
            padding: 0.875rem;
        }
        .list-wrapper {
            max-height: 500px;
            overflow-y: auto;
            padding-right: 0.5rem;
        }
        .movement-item {
            display: flex;
            align-items: center;
            padding: 1rem 0.5rem;
            border-bottom: 1px solid var(--border-light);
            transition: background-color 0.2s;
            border-radius: var(--radius-md);
        }
        .movement-item:hover {
            background-color: var(--bg-hover);
        }
        .movement-item:last-child {
            border-bottom: none;
        }
        .indicator {
            width: 12px; height: 12px;
            border-radius: 50%;
            margin-right: 1rem;
            flex-shrink: 0;
            box-shadow: 0 0 0 2px white, 0 0 0 3px transparent; 
        }
        .indicator.in { background: var(--success); box-shadow: 0 0 0 2px white, 0 0 0 4px var(--success-bg); }
        .indicator.out { background: var(--danger); box-shadow: 0 0 0 2px white, 0 0 0 4px var(--danger-bg); }
        
        .mov-details {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .mov-details strong { font-weight: 600; color: var(--text-main); }
        .mov-details span { font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem; }
        
        .mov-meta {
            text-align: right;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
        .text-green { color: var(--success); font-weight: 700; }
        .text-red { color: var(--danger); font-weight: 700; }
        .mov-meta small { color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem; }
        
        .empty-state { color: var(--text-muted); text-align: center; padding: 2rem; font-style: italic; }
      `}</style>
        </Layout>
    );
};

export default StockMovements;
