import { useEffect, useState } from "react";
import "../styles/index.css";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3010/customers")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success) {
          setCustomers(data.customers || []);
        } else {
          setError("Error al cargar clientes");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error de conexión");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="table-card small">
        <div className="loading-box">Cargando clientes...</div>
      </div>
    );

  if (error) return <div className="error-box">{error}</div>;

  return (
    <div className="app-container">
      <div className="headerPrincipal">
        <h2 className="title">Listado de Clientes</h2>
      </div>

      <div className="table-card" role="region" aria-label="Listado de clientes">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                {["ID", "Nombre", "Dirección", "Teléfono", "Código"].map((th) => (
                  <th key={th}>{th}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="table-no-data">
                    No hay clientes registrados
                  </td>
                </tr>
              ) : (
                customers.map((c, i) => {
                  const key = c.id ?? i;
                  return (
                    <tr key={key}>
                      <td>{c.id ?? "—"}</td>
                      <td>{c.name || "Sin nombre"}</td>
                      <td>{c.address || "N/A"}</td>
                      <td>{c.phone || "N/A"}</td>
                      <td>
                        <span
                          className="code-tag"
                          style={{
                            background: codeColors[i % codeColors.length].background,
                            color: codeColors[i % codeColors.length].color,
                          }}
                        >
                          {c.code ?? "—"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="card-footer">
          Total de clientes: <strong>{customers.length}</strong>
        </div>
      </div>
    </div>
  );
}

const codeColors = [
  { background: "rgba(124,92,255,0.18)", color: "#cbb3ff" },
  { background: "rgba(0,200,180,0.12)", color: "#5ff3de" },
  { background: "rgba(255,90,120,0.12)", color: "#ffb3c4" },
  { background: "rgba(120,200,255,0.12)", color: "#bde7ff" },
];
