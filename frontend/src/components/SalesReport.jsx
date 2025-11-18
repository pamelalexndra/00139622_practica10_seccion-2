import { useEffect, useState } from "react";

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
      } catch (err) {
        if (!cancelled) setError("Error al conectar con el servidor.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const formatAmount = (val) => {
    const n = parseFloat(val || 0);
    return n.toLocaleString("es-SV", { style: "currency", currency: "USD" });
  };

  const totalGeneral = report.reduce(
    (sum, r) => sum + parseFloat(r.total_sales || 0),
    0
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.gradientDot} />
        <h2 style={styles.title}>Reporte de Ventas</h2>
      </div>

      <div style={styles.tableCard}>
        {loading ? (
          <div style={styles.loadingBox}>Generando reporte...</div>
        ) : error ? (
          <div style={styles.errorBox}>{error}</div>
        ) : (
          <div style={{ overflowX: "auto", boxSizing: "border-box" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Cliente</th>
                  <th style={styles.th}>Total Vendido</th>
                  <th style={styles.th}>Porcentaje</th>
                </tr>
              </thead>

              <tbody>
                {report.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={styles.noData}>
                      No hay datos para mostrar
                    </td>
                  </tr>
                ) : (
                  report.map((r, i) => {
                    const amount = parseFloat(r.total_sales || 0);
                    const percent =
                      totalGeneral > 0
                        ? ((amount / totalGeneral) * 100).toFixed(1)
                        : 0;

                    return (
                      <tr key={i} style={styles.tr}>
                        <td style={styles.tdStrong}>{r.name}</td>

                        <td style={styles.amount}>{formatAmount(amount)}</td>

                        <td style={styles.td}>
                          <div style={styles.barContainer}>
                            <div
                              style={{
                                ...styles.barFill,
                                width: `${Math.max(0, Math.min(100, percent))}%`,
                              }}
                            ></div>
                          </div>
                          <span style={styles.percentText}>{percent}%</span>
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

const styles = {
  container: {
    width: "100%",
    padding: 30,
    boxSizing: "border-box",
    color: "#ffffff",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 6,
  },

  gradientDot: {
    width: 18,
    height: 18,
    borderRadius: 6,
    background: "linear-gradient(90deg,#7c5cff,#a770ff)",
  },

  title: {
    fontSize: 20,
    fontWeight: 700,
    color: "#c7b6ff",
    margin: 0,
  },

  subtitle: {
    fontSize: 13,
    color: "#9999bb",
    marginBottom: 18,
  },

  tableCard: {
    borderRadius: 16,
    background: "#0e0e10",
    border: "1px solid #1d1d22",
    padding: 8,
    boxShadow: "0 6px 18px rgba(0,0,0,0.65)",
    boxSizing: "border-box",
  },

  loadingBox: {
    padding: 28,
    textAlign: "center",
    color: "#888",
  },

  errorBox: {
    padding: 16,
    borderRadius: 12,
    background: "rgba(255,60,60,0.1)",
    border: "1px solid rgba(255,80,80,0.25)",
    color: "#ff9b9b",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    color: "#e5e7eb",
    minWidth: 0, 
    boxSizing: "border-box",
  },

  th: {
    padding: "14px 16px",
    textAlign: "left",
    color: "#c7b6ff",
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    borderBottom: "1px solid #1d1d22",
    background: "#0a0a0b",
    whiteSpace: "nowrap", 
  },

  tr: {
    borderBottom: "1px solid #1d1d22",
    transition: "background 160ms",
  },

  td: {
    padding: "14px 16px",
    color: "#eee",
    fontSize: 14,
    whiteSpace: "normal", 
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    boxSizing: "border-box",
    maxWidth: 360,  
  },

  tdStrong: {
    padding: "14px 16px",
    color: "white",
    fontSize: 15,
    fontWeight: 600,
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    maxWidth: 360,
  },

  amount: {
    padding: "14px 16px",
    fontSize: 15,
    fontWeight: 700,
    color: "#c792ff",
    whiteSpace: "nowrap",
  },

  noData: {
    padding: 28,
    textAlign: "center",
    color: "#999",
  },

  barContainer: {
    width: "100%",
    height: 8,
    borderRadius: 6,
    background: "#1d1d22",
    overflow: "hidden",
    marginBottom: 6,
  },

  barFill: {
    height: "100%",
    background: "linear-gradient(90deg,#7c5cff,#a770ff)",
    transition: "width 0.3s ease",
  },

  percentText: {
    fontSize: 12,
    color: "#bbb",
    display: "inline-block",
    marginLeft: 8,
  },
};
