import { useEffect, useState } from "react";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3010/customers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCustomers(data.customers);
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
      <div style={styles.card}>
        <div style={styles.loading}>Cargando clientes...</div>
      </div>
    );

  if (error)
    return (
      <div style={styles.errorBox}>
        {error}
      </div>
    );

  return (
    <div>
      <div style={styles.header}>
        <span style={styles.icon}>👥</span>
        <h2 style={styles.title}>Listado de Clientes</h2>
      </div>

      <p style={styles.subtitle}>Base de datos completa de clientes</p>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              {["Código", "Nombre", "Dirección", "Teléfono", "Código"]
                .map((th) => (
                  <th key={th} style={styles.th}>{th}</th>
                ))
              }
            </tr>
          </thead>

          <tbody>
            {customers.map((c, i) => (
              <tr key={c.id} style={styles.tr}>
                <td style={styles.td}>
                  <span style={{ ...styles.codeTag, ...codeColors[i % codeColors.length] }}>
                    {c.code || `CLI-${String(c.id).padStart(3, "0")}`}
                  </span>
                </td>

                <td style={styles.td}>{c.name}</td>
                <td style={styles.td}>{c.email || "N/A"}</td>
                <td style={styles.td}>{c.phone || "N/A"}</td>
                <td style={styles.td}>{c.total_sales || 0}</td>

                <td style={{ ...styles.td, fontWeight: 700 }}>
                  ${parseFloat(c.total_amount || 0).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {customers.length === 0 && (
          <div style={styles.noData}>No hay clientes registrados</div>
        )}
      </div>

      <div style={styles.footer}>
        Total de clientes: <strong>{customers.length}</strong>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },

  icon: {
    fontSize: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
  },

  subtitle: {
    color: "#9aa3ad",
    marginBottom: 16,
    marginTop: -2,
  },

  tableWrapper: {
    overflow: "hidden",
    borderRadius: 16,
    background: "#14171d",
    boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    color: "#e5e7eb",
  },

  th: {
    background: "rgba(255,255,255,0.05)",
    textAlign: "left",
    padding: "12px 16px",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#9ca3af",
  },

  tr: {
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    transition: "background 0.16s",
  },

  td: {
    padding: "14px 16px",
    fontSize: 15,
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
    marginTop: 14,
    fontSize: 14,
    color: "#9aa3ad",
  },

  loading: {
    padding: 24,
    textAlign: "center",
    color: "#9aa3ad",
  },

  errorBox: {
    padding: 16,
    borderRadius: 12,
    background: "rgba(255,0,0,0.1)",
    border: "1px solid rgba(255,0,0,0.2)",
    color: "#ff6b6b",
  },
};

const codeColors = [
  { background: "rgba(124,92,255,0.25)", color: "#cbb3ff" },
  { background: "rgba(0,200,180,0.25)", color: "#5ff3de" },
  { background: "rgba(255,90,120,0.25)", color: "#ffb3c4" },
  { background: "rgba(120,200,255,0.25)", color: "#bde7ff" },
];
