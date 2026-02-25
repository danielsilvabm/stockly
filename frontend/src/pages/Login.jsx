import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.jsx";

function Login() {
  const navigate = useNavigate();

  const [modo, setModo] = useState("login"); // "login" ou "register"
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const usuarioLogado =
    typeof window !== "undefined"
      ? localStorage.getItem("usuario")
      : null;
  const nomeUsuario =
    usuarioLogado && JSON.parse(usuarioLogado)?.nome
      ? JSON.parse(usuarioLogado).nome
      : null;

  const limparMensagens = () => {
    setErro("");
    setMensagem("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    limparMensagens();

    try {
      setCarregando(true);

      const response = await api.post("/auth/login", {
        email,
        senha,
      });

      const { token, usuario } = response.data;

      if (token) {
        localStorage.setItem("token", token);
      }
      if (usuario) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
      }

      setMensagem("Login realizado com sucesso.");
      navigate("/");
    } catch (error) {
      const msg =
        error.response?.data?.erro ||
        error.response?.data?.message ||
        "Erro ao fazer login.";
      setErro(msg);
    } finally {
      setCarregando(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    limparMensagens();

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      setCarregando(true);

      await api.post("/auth/register", {
        nome,
        email,
        senha,
      });

      setMensagem("Cadastro realizado com sucesso. Faça login para continuar.");
      setModo("login");
      setSenha("");
      setConfirmarSenha("");
    } catch (error) {
      const msg =
        error.response?.data?.erro ||
        error.response?.data?.message ||
        "Erro ao realizar cadastro.";
      setErro(msg);
    } finally {
      setCarregando(false);
    }
  };

  const isLogin = modo === "login";

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Acesso ao Stockly</h1>
        <p style={styles.subtitle}>
          Faça login ou crie uma conta para gerenciar o almoxarifado.
        </p>

        {token && (
          <div style={{ marginBottom: 16 }}>
            <p style={{ marginBottom: 8 }}>
              {nomeUsuario
                ? `Você está logado como ${nomeUsuario}.`
                : "Você já está logado."}
            </p>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("usuario");
                navigate("/login", { replace: true });
              }}
              style={{
                ...styles.submit,
                backgroundColor: "#ef4444",
                color: "#fee2e2",
              }}
            >
              Sair
            </button>
          </div>
        )}

        {!token && (
          <div style={styles.tabs}>
          <button
            type="button"
            onClick={() => {
              limparMensagens();
              setModo("login");
            }}
            style={{
              ...styles.tabButton,
              ...(isLogin ? styles.tabButtonActive : {}),
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              limparMensagens();
              setModo("register");
            }}
            style={{
              ...styles.tabButton,
              ...(!isLogin ? styles.tabButtonActive : {}),
            }}
          >
            Registrar
          </button>
        </div>
        )}

        {erro && <p style={{ color: "#f97316", marginTop: 8 }}>{erro}</p>}
        {mensagem && (
          <p style={{ color: "#22c55e", marginTop: 8 }}>{mensagem}</p>
        )}

        {!token && (isLogin ? (
          <form onSubmit={handleLogin} style={styles.form}>
            <label style={styles.label}>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Senha
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                style={styles.input}
              />
            </label>

            <button type="submit" disabled={carregando} style={styles.submit}>
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={styles.form}>
            <label style={styles.label}>
              Nome
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Senha
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Confirmar senha
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                style={styles.input}
              />
            </label>

            <button type="submit" disabled={carregando} style={styles.submit}>
              {carregando ? "Registrando..." : "Registrar"}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    /* removes fixed positioning; keep page tall enough to center beneath the
       navbar (navbar height is roughly 60‑80px depending on padding) */
    width: "100%",
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "radial-gradient(circle at top, #444, #2e2e2e)",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#2e2e2e",
    border: "1px solid #444",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 18px 45px rgba(0, 0, 0, 0.65)",
    color: "#d4d4d4",
  },
  title: {
    margin: 0,
    marginBottom: 4,
  },
  subtitle: {
    marginTop: 0,
    marginBottom: 16,
    color: "#aaa",
  },
  tabs: {
    display: "flex",
    gap: 8,
    backgroundColor: "#2e2e2e",
    borderRadius: 999,
    padding: 4,
    marginBottom: 16,
    border: "1px solid #444",
  },
  tabButton: {
    flex: 1,
    border: "none",
    borderRadius: 999,
    padding: "8px 0",
    background: "transparent",
    color: "#aaa",
    cursor: "pointer",
    fontWeight: 500,
  },
  tabButtonActive: {
    background: "#4a4a4a",
    color: "#f0f0f0",
    boxShadow: "0 0 0 1px #555",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 8,
  },
  label: {
    fontSize: 13,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  input: {
    padding: 8,
    borderRadius: 8,
    border: "1px solid #444",
    backgroundColor: "#2e2e2e",
    color: "#d4d4d4",
  },
  submit: {
    marginTop: 8,
    padding: "10px 0",
    borderRadius: 999,
    border: "none",
    backgroundColor: "#22c55e",
    color: "#022c22",
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default Login;

