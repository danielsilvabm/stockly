import { useEffect, useState } from "react";
import api from "../services/api";

function Estoque() {
  const [ferramentas, setFerramentas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        const response = await api.get("/ferramentas");
        const dados = response.data?.dados || [];
        setFerramentas(dados);
      } catch (error) {
        console.error("Erro ao carregar estoque:", error);
        setErro("Não foi possível carregar o estoque.");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  return (
    <div>
      <h2>Estoque</h2>
      <p>Visualize as ferramentas cadastradas e seus saldos.</p>

      {carregando && <p>Carregando...</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {!carregando && !erro && ferramentas.length === 0 && (
        <p>Nenhuma ferramenta cadastrada.</p>
      )}

      {ferramentas.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "16px" }}>
          <thead>
            <tr>
              <th style={styles.th}>Código</th>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {ferramentas.map((ferramenta) => (
              <tr key={ferramenta.id}>
                <td style={styles.td}>{ferramenta.codigo}</td>
                <td style={styles.td}>{ferramenta.nome}</td>
                <td style={styles.td}>{ferramenta.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  th: {
    textAlign: "left",
    borderBottom: "1px solid #e5e7eb",
    padding: "8px",
  },
  td: {
    borderBottom: "1px solid #f3f4f6",
    padding: "8px",
  },
};

export default Estoque;