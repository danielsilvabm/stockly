import { useEffect, useState } from "react";
import ProdutoForm from "../components/ProdutoForm";
import api from "../services/api";

function Dashboard() {
  const [ferramentas, setFerramentas] = useState([]);
  const [carregandoFerramentas, setCarregandoFerramentas] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarFerramentas() {
      try {
        setCarregandoFerramentas(true);
        const response = await api.get("/ferramentas");
        const dados = response.data?.dados || [];
        setFerramentas(dados);
      } catch (error) {
        console.error("Erro ao buscar ferramentas:", error);
        setErro("Não foi possível carregar as ferramentas.");
      } finally {
        setCarregandoFerramentas(false);
      }
    }

    carregarFerramentas();
  }, []);

  const handleMovimentacao = async (dados) => {
    try {
      setErro("");
      setMensagem("");
      setSalvando(true);

      await api.post("/movimentacoes", dados);

      setMensagem("Movimentação registrada com sucesso.");
    } catch (error) {
      console.error("Erro ao registrar movimentação:", error);
      const msg =
        error.response?.data?.message ||
        error.response?.data?.mensagem ||
        "Erro ao registrar movimentação.";
      setErro(msg);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Registre entradas e saídas de ferramentas.</p>

      {carregandoFerramentas && <p>Carregando ferramentas...</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}

      <ProdutoForm
        ferramentas={ferramentas}
        onSubmit={handleMovimentacao}
        loading={salvando}
      />
    </div>
  );
}

export default Dashboard;