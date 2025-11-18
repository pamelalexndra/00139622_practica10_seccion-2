import { useEffect, useState } from "react";
import "../styles/index.css";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:3010/sales");
        const data = await res.json();
        if (!cancelled) {
          if (data && data.success && Array.isArray(data.sales)) {
            setSales(data.sales);
          } else {
            setSales([]);
            setError(data?.message || "No se pudieron cargar las ventas.");
          }
        }
      } catch {
        if (!cancelled) setError("Error al conectar con el servidor.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const formatDate = (raw) => {
    try {
      if (!raw) return "—";
      const d = new Date(raw);
      return d.toLocaleDateString("es-SV", { day: "2-digit", month: "2-digit", year: "numeric" });
    } catch {
      return "—";
    }
  };

  const formatAmount = (val) => {
    const n = parseFloat(val || 0);
    return n.toLocaleString("es-SV", { style: "currency", currency: "USD" });
  };

  return (
    <div className="app-container">
      <div className="header">
        <h2 className="title">Historial de Ventas</h2>
      </div>

      <div className="table-card small">
        {loading ? (
          <div className="loading-box">Cargando ventas...</div>
        ) : error ? (
          <div className="error-box">{error}</div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                </tr>
              </thead>

              <tbody>
                {sales.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="table-no-data">No hay ventas registradas</td>
                  </tr>
                ) : (
                  sales.map((s, i) => {
                    const id = s.id ?? i;
                    const amount = s.amount ?? 0;
                    const date = s.created_at ?? s.createdAt ?? null;
                    const customerName = s.customer_name ?? s.name ?? "—";

                    return (
                      <tr key={id}>
                        <td>{id}</td>
                        <td className="amount">{formatAmount(amount)}</td>
                        <td>{formatDate(date)}</td>
                        <td className="td-strong">{customerName}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
