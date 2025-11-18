import { useState } from "react";
import "../styles/index.css";

export default function CustomerSearch() {
  const [code, setCode] = useState("");
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!code.trim()) {
      setError("Por favor ingresa un código.");
      return;
    }

    setLoading(true);
    setError("");
    setCustomer(null);

    try {
      const res = await fetch(`http://localhost:3010/customers/search?code=${encodeURIComponent(code)}`);
      const data = await res.json();

      if (data?.success && Array.isArray(data.resultsFind) && data.resultsFind.length > 0) {
        setCustomer(data.resultsFind[0]);
      } else {
        setError("No se encontró ningún cliente con ese código.");
      }
    } catch {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="app-container">
      <div className="header">
        <h2 className="title">Buscar Cliente por Código</h2>
      </div>

      <div className="card">
        <div className="form-row">
          <input
            className="input"
            type="text"
            placeholder="Ingresa el código del cliente…"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleEnter}
            aria-label="Código del cliente"
          />

          <button className="btn" onClick={handleSearch} disabled={loading}>
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>

        {error && <div className="error-box">{error}</div>}

        {customer && (
          <div className="result-card">
            <h3 className="result-title">{customer.name ?? "Sin nombre"}</h3>

            <div className="grid">
              <div className="item">
                <p className="label">ID</p>
                <p className="value">{customer.id ?? "—"}</p>
              </div>
              <div className="item">
                <p className="label">Código</p>
                <p className="value">{customer.code ?? "—"}</p>
              </div>
              <div className="item">
                <p className="label">Teléfono</p>
                <p className="value">{customer.phone ?? "N/A"}</p>
              </div>
              <div className="item">
                <p className="label">Dirección</p>
                <p className="value">{customer.address ?? "N/A"}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
