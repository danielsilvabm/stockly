import { useEffect, useState } from "react";
import api from "../services/api";

function Movimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState([]);

  useEffect(() => {
    async function carregarMovimentacoes() {
      try {
        const response = await api.get("/movimentacoes");
        setMovimentacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar movimentações:", error);
      }
    }

    carregarMovimentacoes();
  }, []);

  return (
    <div>
      <h2>Movimentações</h2>

      <ul>
        {movimentacoes.map((mov) => (
          <li key={mov.id}>
            {mov.tipo} - {mov.quantidade} - {mov.ferramenta_nome}{" "}
            {mov.responsavel && `- ${mov.responsavel}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movimentacoes;