import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LayoutDashboard, Package, ArrowRightLeft, LogOut, User, Sun, Moon } from 'lucide-react';
import './Layout.css'; // Vamos criar este CSS próximo

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <div className="layout-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>WMS</h2>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/" className={`nav-item ${isActive('/')}`}>
                        <LayoutDashboard size={20} />
                        <span>Painel</span>
                    </Link>
                    <Link to="/products" className={`nav-item ${isActive('/products')}`}>
                        <Package size={20} />
                        <span>Produtos</span>
                    </Link>
                    <Link to="/stock-movements" className={`nav-item ${isActive('/stock-movements')}`}>
                        <ArrowRightLeft size={20} />
                        <span>Movimentações</span>
                    </Link>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={toggleTheme} className="theme-toggle-btn">
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                    <div className="user-info">
                        <User size={16} />
                        <span>{user?.name}</span>
                    </div>
                    <button onClick={logout} className="logout-btn">
                        <LogOut size={16} />
                        <span>Sair</span>
                    </button>
                </div>
            </aside>
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
