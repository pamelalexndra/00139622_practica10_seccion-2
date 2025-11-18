import { useEffect, useState } from "react";
import "../styles/index.css";

export default function SalesReport() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:3010/sales/report");
        const data = await res.json();
        if (!cancelled) {
          if (data.success && Array.isArray(data.resultsFind)) {
            setReport(data.resultsFind);
          } else {
            setReport([]);
            setError(data.message || "No se pudo generar el reporte.");
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

  const formatAmount = (val) => {
    const n = parseFloat(val || 0);
    return n.toLocaleString("es-SV", { style: "currency", currency: "USD" });
  };

  const totalGeneral = report.reduce((sum, r) => sum + parseFloat(r.total_sales || 0), 0);

  return (
    <div className="app-container">
      <div className="header">
        <h2 className="title">Reporte de Ventas</h2>
      </div>

      <div className="table-card small">
        {loading ? (
          <div className="loading-box">Generando reporte...</div>
        ) : error ? (
          <div className="error-box">{error}</div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Total Vendido</th>
                  <th>Porcentaje</th>
                </tr>
              </thead>

              <tbody>
                {report.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="table-no-data">No hay datos para mostrar</td>
                  </tr>
                ) : (
                  report.map((r, i) => {
                    const amount = parseFloat(r.total_sales || 0);
                    const percent = totalGeneral > 0 ? ((amount / totalGeneral) * 100).toFixed(1) : 0;
                    return (
                      <tr key={i}>
                        <td className="td-strong">{r.name}</td>
                        <td className="amount">{formatAmount(amount)}</td>
                        <td>
                          <div className="bar-container">
                            <div className="bar-fill" style={{ width: `${Math.max(0, Math.min(100, percent))}%` }} />
                          </div>
                          <span className="percent-text">{percent}%</span>
                        </td>
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
