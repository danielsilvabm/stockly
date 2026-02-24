import { useState } from "react";

function ProdutoForm({ ferramentas, onSubmit, loading }) {
  const [ferramentaId, setFerramentaId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [tipo, setTipo] = useState("entrada");

  const handleSubmit = (e) => {
    e.preventDefault();

    const dados = {
      ferramenta_id: Number(ferramentaId),
      quantidade: Number(quantidade),
      tipo,
    };

    onSubmit(dados);

    setQuantidade("");
    setTipo("entrada");
  };

  const semFerramentas = !ferramentas || ferramentas.length === 0;

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Registrar movimentação</h3>

      {semFerramentas ? (
        <p style={{ color: "#f97316" }}>
          Nenhuma ferramenta cadastrada. Cadastre pelo backend antes de movimentar.
        </p>
      ) : (
        <>
          <select
            value={ferramentaId}
            onChange={(e) => setFerramentaId(e.target.value)}
            required
          >
            <option value="">Selecione a ferramenta</option>
            {ferramentas.map((ferramenta) => (
              <option key={ferramenta.id} value={ferramenta.id}>
                {ferramenta.nome} ({ferramenta.codigo})
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            min="1"
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />

          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </>
      )}
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
  },
};

export default ProdutoForm;