import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

function Ferramentas() {
  const [ferramentas, setFerramentas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const [form, setForm] = useState({
    nome: "",
    codigo: "",
    descricao: "",
    categoria: "",
    quantidade: "0",
  });

  const quantidadeNumero = useMemo(() => {
    const n = Number(form.quantidade);
    return Number.isFinite(n) ? n : 0;
  }, [form.quantidade]);

  async function carregarFerramentas() {
    try {
      setErro("");
      setCarregando(true);
      const response = await api.get("/ferramentas");
      setFerramentas(response.data?.dados || []);
    } catch (error) {
      console.error("Erro ao carregar ferramentas:", error);
      setErro("Não foi possível carregar as ferramentas.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarFerramentas();
  }, []);

  const onChange = (campo) => (e) => {
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErro("");
      setMensagem("");
      setSalvando(true);

      const payload = {
        nome: form.nome.trim(),
        codigo: form.codigo.trim(),
        descricao: form.descricao.trim(),
        categoria: form.categoria.trim(),
        quantidade: quantidadeNumero,
      };

      await api.post("/ferramentas", payload);

      setMensagem("Ferramenta cadastrada com sucesso.");
      setForm({
        nome: "",
        codigo: "",
        descricao: "",
        categoria: "",
        quantidade: "0",
      });

      await carregarFerramentas();
    } catch (error) {
      console.error("Erro ao cadastrar ferramenta:", error);
      console.error("Resposta da API:", error.response?.data);
      const msg =
        error.response?.data?.erro ||
        error.response?.data?.message ||
        error.response?.data?.mensagem ||
        "Erro ao cadastrar ferramenta.";
      setErro(msg);
    } finally {
      setSalvando(false);
    }
  };

  const remover = async (id) => {
    const ok = window.confirm("Remover esta ferramenta?");
    if (!ok) return;

    try {
      setErro("");
      setMensagem("");
      await api.delete(`/ferramentas/${id}`);
      setMensagem("Ferramenta removida.");
      await carregarFerramentas();
    } catch (error) {
      console.error("Erro ao remover ferramenta:", error);
      console.error("Resposta da API:", error.response?.data);
      const msg =
        error.response?.data?.erro ||
        error.response?.data?.message ||
        error.response?.data?.mensagem ||
        "Erro ao remover ferramenta.";
      setErro(msg);
    }
  };

  return (
    <div>
      <h2>Ferramentas</h2>
      <p>Cadastrar e gerenciar ferramentas do estoque.</p>

      {erro && <p style={{ color: "#f97373" }}>{erro}</p>}
      {mensagem && <p style={{ color: "#4ade80" }}>{mensagem}</p>}

      <div style={styles.card}>
        <h3 style={{ marginTop: 0 }}>Cadastrar ferramenta</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Nome *</label>
              <input
                value={form.nome}
                onChange={onChange("nome")}
                placeholder="Ex.: Furadeira"
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Código *</label>
              <input
                value={form.codigo}
                onChange={onChange("codigo")}
                placeholder="Ex.: FRD-001"
                required
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Categoria</label>
              <input
                value={form.categoria}
                onChange={onChange("categoria")}
                placeholder="Ex.: Elétricas"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Quantidade inicial</label>
              <input
                type="number"
                min="0"
                value={form.quantidade}
                onChange={onChange("quantidade")}
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Descrição</label>
            <input
              value={form.descricao}
              onChange={onChange("descricao")}
              placeholder="Opcional"
            />
          </div>

          <button type="submit" disabled={salvando}>
            {salvando ? "Salvando..." : "Cadastrar"}
          </button>
        </form>
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>Lista</h3>
        {carregando && <p>Carregando...</p>}
        {!carregando && ferramentas.length === 0 && <p>Nenhuma ferramenta.</p>}

        {ferramentas.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Código</th>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>Categoria</th>
                <th style={styles.th}>Quantidade</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {ferramentas.map((f) => (
                <tr key={f.id}>
                  <td style={styles.td}>{f.codigo}</td>
                  <td style={styles.td}>{f.nome}</td>
                  <td style={styles.td}>{f.categoria || "-"}</td>
                  <td style={styles.td}>{f.quantidade}</td>
                  <td style={styles.td}>
                    <button onClick={() => remover(f.id)} style={styles.removeButton}>
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #1b1b1b",
    borderRadius: 8,
    padding: 24,
    background: "#1b1b1b",
    maxWidth: 960,
    boxShadow: "0 18px 45px rgba(0, 0, 0, 0.55)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: { fontSize: 12, color: "#aaa" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#2e2e2e",
    borderRadius: 8,
    overflow: "hidden",
  },
  th: {
    textAlign: "left",
    borderBottom: "1px solid #444",
    backgroundColor: "#111010",
    color: "#d4d4d4",
    padding: "8px",
  },
  td: {
    borderBottom: "1px solid #444",
    color: "#d4d4d4",
    padding: "8px",
  },
  removeButton: {
    backgroundColor: "#ef4444",
    color: "#fee2e2",
    border: "none",
    padding: "5px 6px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: "0.875rem",
  }
};

export default Ferramentas;
