import { useEffect, useState } from "react";
import api from "../services/api";

function Relatorio() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        const response = await api.get("/movimentacoes");
        setMovimentacoes(response.data || []);
      } catch (error) {
        console.error("Erro ao carregar movimentações:", error);
        setErro("Não foi possível carregar as movimentações.");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  const formatarData = (dataIso) => {
    if (!dataIso) return "-";
    const data = new Date(dataIso);
    if (Number.isNaN(data.getTime())) return dataIso;
    return data.toLocaleString();
  };

  return (
    <div>
      <h2>Relatório de Movimentações</h2>
      <p>Veja o histórico de entradas e saídas por ferramenta.</p>

      {carregando && <p>Carregando...</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {!carregando && !erro && movimentacoes.length === 0 && (
        <p>Nenhuma movimentação registrada.</p>
      )}

      {movimentacoes.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "16px" }}>
          <thead>
            <tr>
              <th style={styles.th}>Data</th>
              <th style={styles.th}>Ferramenta</th>
              <th style={styles.th}>Tipo</th>
              <th style={styles.th}>Quantidade</th>
              <th style={styles.th}>Responsável</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map((mov) => (
              <tr key={mov.id}>
                <td style={styles.td}>{formatarData(mov.data)}</td>
                <td style={styles.td}>{mov.ferramenta_nome}</td>
                <td style={styles.td}>{mov.tipo}</td>
                <td style={styles.td}>{mov.quantidade}</td>
                <td style={styles.td}>{mov.responsavel || "-"}</td>
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
    borderBottom: "1px solid #ccc",
    padding: "8px",
  },
  td: {
    borderBottom: "1px solid #f3f4f6",
    padding: "8px",
  },
};

export default Relatorio;