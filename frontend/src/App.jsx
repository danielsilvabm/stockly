import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Estoque from "./pages/Estoque";
import Relatorio from "./pages/Relatorio";
import Ferramentas from "./pages/Ferramentas";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0f172a",
          color: "#e5e7eb",
        }}
      >
        <Navbar />

        <main style={{ flex: 1, padding: "30px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ferramentas" element={<Ferramentas />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/relatorio" element={<Relatorio />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;