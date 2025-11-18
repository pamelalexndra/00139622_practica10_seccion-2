import { useEffect, useState } from "react";

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
      <div style={styles.tableCard}>
        <div style={styles.loadingBox}>Cargando clientes...</div>
      </div>
    );

  if (error) return <div style={styles.errorBox}>{error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.gradientDot} />
        <h2 style={styles.title}>Listado de Clientes</h2>
      </div>

      <p style={styles.subtitle}>Base de datos completa de clientes</p>

      <div style={styles.tableCard} role="region" aria-label="Listado de clientes">
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["ID", "Nombre", "Dirección", "Teléfono", "Código"].map((th) => (
                  <th key={th} style={styles.th}>
                    {th}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={5} style={styles.noData}>
                    No hay clientes registrados
                  </td>
                </tr>
              ) : (
                customers.map((c, i) => {
                  const key = c.id ?? i;
                  return (
                    <tr key={key} style={styles.tr}>
                      <td style={styles.td}>{c.id ?? "—"}</td>
                      <td style={styles.td}>{c.name || "Sin nombre"}</td>
                      <td style={styles.td}>{c.address || "N/A"}</td>
                      <td style={styles.td}>{c.phone || "N/A"}</td>
                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.codeTag,
                            ...(codeColors[i % codeColors.length] || {}),
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

        <div style={styles.footer}>
          Total de clientes: <strong>{customers.length}</strong>
        </div>
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
    marginTop: '70px'
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
    marginBottom: 12,
    marginTop: 6,
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
    background: "rgba(255,0,0,0.08)",
    border: "1px solid rgba(255,0,0,0.15)",
    color: "#ff6b6b",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    color: "#e5e7eb",
    minWidth: 0, 
    boxSizing: "border-box",
  },

  th: {
    background: "rgba(255,255,255,0.05)",
    textAlign: "left",
    padding: "12px 16px",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#9ca3af",
    whiteSpace: "nowrap", 
  },

  tr: {
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    transition: "background 0.16s",
  },

  td: {
    padding: "14px 16px",
    fontSize: 15,
    verticalAlign: "middle",
    whiteSpace: "normal", 
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    boxSizing: "border-box",
    maxWidth: 280, 
  },

  codeTag: {
    padding: "6px 12px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
    display: "inline-block",
  },

  noData: {
    textAlign: "center",
    padding: 24,
    color: "#868c96",
  },

  footer: {
    marginTop: 12,
    padding: "10px 16px",
    fontSize: 14,
    color: "#9aa3ad",
    borderTop: "1px solid rgba(255,255,255,0.02)",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
  },
};

const codeColors = [
  { background: "rgba(124,92,255,0.18)", color: "#cbb3ff" },
  { background: "rgba(0,200,180,0.12)", color: "#5ff3de" },
  { background: "rgba(255,90,120,0.12)", color: "#ffb3c4" },
  { background: "rgba(120,200,255,0.12)", color: "#bde7ff" },
];
