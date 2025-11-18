import { useEffect, useState } from "react";

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

  const formatDate = (raw) => {
    try {
      if (!raw) return "—";
      const d = new Date(raw);
      return d.toLocaleDateString("es-SV", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  const formatAmount = (val) => {
    const n = parseFloat(val || 0);
    return n.toLocaleString("es-SV", { style: "currency", currency: "USD" });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.gradientDot} />
        <h2 style={styles.title}>Historial de Ventas</h2>
      </div>

      <div style={styles.tableCard}>
        {loading ? (
          <div style={styles.loadingBox}>Cargando ventas...</div>
        ) : error ? (
          <div style={styles.errorBox}>{error}</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table} aria-label="Tabla de ventas">
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Monto</th>
                  <th style={styles.th}>Fecha</th>
                  <th style={styles.th}>Cliente</th>
                </tr>
              </thead>

              <tbody>
                {sales.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={styles.noData}>
                      No hay ventas registradas
                    </td>
                  </tr>
                ) : (
                  sales.map((s, i) => {
                    const id = s.id ?? i;
                    const amount = s.amount ?? 0;
                    const date = s.created_at ?? s.createdAt ?? null;
                    const customerName = s.customer_name ?? s.name ?? "—";

                    return (
                      <tr key={id} style={styles.tr}>
                        <td style={styles.td}>{id}</td>
                        <td style={styles.amount}>{formatAmount(amount)}</td>
                        <td style={styles.td}>{formatDate(date)}</td>
                        <td style={styles.tdStrong}>{customerName}</td>
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
    marginBottom: 4,
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
    minWidth: 640,
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
  },

  tdStrong: {
    padding: "14px 16px",
    color: "white",
    fontSize: 15,
    fontWeight: 600,
  },

  amount: {
    padding: "14px 16px",
    fontSize: 15,
    fontWeight: 700,
    color: "#c792ff",
    whiteSpace: "nowrap",
  },

  codeTag: {
    display: "inline-block",
    background: "rgba(124,92,255,0.22)",
    color: "#e0d4ff",
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
  },

  noData: {
    padding: 28,
    textAlign: "center",
    color: "#999",
  },
};
