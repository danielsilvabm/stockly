import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#fff" : "#ccc",
    fontWeight: location.pathname === path ? "bold" : "normal",
  });

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
    backgroundColor: "#1e293b",
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
    backgroundColor: "#0f172a",
  },
  logo: {
    color: "#fff",
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "20px",
  },
};

export default Navbar;