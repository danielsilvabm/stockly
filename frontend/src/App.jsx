import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./pages/Dashboard";
import Estoque from "./pages/Estoque";
import Relatorio from "./pages/Relatorio";
import Ferramentas from "./pages/Ferramentas";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#2e2e2e",
          color: "#d4d4d4",
        }}
      >
        <Navbar />

        <main
          style={{
            flex: 1,
            padding: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: "1100px" }}>
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/ferramentas"
                element={
                  <RequireAuth>
                    <Ferramentas />
                  </RequireAuth>
                }
              />
              <Route
                path="/estoque"
                element={
                  <RequireAuth>
                    <Estoque />
                  </RequireAuth>
                }
              />
              <Route
                path="/relatorio"
                element={
                  <RequireAuth>
                    <Relatorio />
                  </RequireAuth>
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;