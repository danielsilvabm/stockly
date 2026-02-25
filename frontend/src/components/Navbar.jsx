import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // check for authentication so we can render logout or login
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const linkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#f0f0f0" : "#aaa",
    fontWeight: location.pathname === path ? "bold" : "normal",
  });

  const handleLogout = () => {
    // ask for confirmation before removing credentials
    if (window.confirm("Tem certeza de que deseja sair?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <div style={styles.logoPlaceholder} />
        <h2 style={styles.logo}>Stockly</h2>
      </div>

      <div style={styles.links}>
        <Link to="/" style={linkStyle("/")}>Dashboard</Link>
        <Link to="/ferramentas" style={linkStyle("/ferramentas")}>Ferramentas</Link>
        <Link to="/estoque" style={linkStyle("/estoque")}>Estoque</Link>
        <Link to="/relatorio" style={linkStyle("/relatorio")}>Relatório</Link>
        {token ? (
          <button onClick={handleLogout} style={styles.logoutButton}>
            Sair
          </button>
        ) : (
          <Link to="/login" style={linkStyle("/login")}>Login</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#111010",
    borderBottom: "1px solid #444",
    zIndex: 10, // ensure navbar stays above any full‑screen overlays
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#333",
  },
  logo: {
    color: "#f0f0f0",
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  logoutButton: {
    background: "#ef4444",
    border: "none",
    color: "#fee2e2",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 500,
    padding: "6px 12px",
    borderRadius: 6,
  },
  
};

export default Navbar;