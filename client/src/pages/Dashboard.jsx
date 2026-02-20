import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({ products: 0, movements: 0 });

    useEffect(() => {
        // Buscar estatísticas simples
        const fetchStats = async () => {
            // Em uma aplicação real, poderíamos ter um endpoint específico para estatísticas do painel
            // Aqui apenas buscamos comprimentos de lista para demonstração
            try {
                const prodRes = await api.get('/products');
                const movRes = await api.get('/stock/movements');
                setStats({
                    products: prodRes.data.results,
                    movements: movRes.data.results
                });
            } catch (err) {
                console.error("Erro ao carregar estatísticas", err);
            }
        };
        fetchStats();
    }, []);

    return (
        <Layout>
            <h1>Painel</h1>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total de Produtos</h3>
                    <p className="stat-value">{stats.products}</p>
                </div>
                <div className="stat-card">
                    <h3>Total de Movimentações</h3>
                    <p className="stat-value">{stats.movements}</p>
                </div>
            </div>

            <style>{`
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }
        .stat-card {
            background: var(--bg-white);
            padding: 2rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-sm);
            border: 1px solid var(--border-light);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }
        .stat-card h3 {
            margin: 0;
            color: var(--text-secondary);
            font-size: 0.875rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .stat-value {
            font-size: 3rem;
            font-weight: 700;
            color: var(--text-main);
            margin: 0.5rem 0 0 0;
            line-height: 1;
        }
      `}</style>
        </Layout>
    );
};

export default Dashboard;
