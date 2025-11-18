import { useState } from "react";

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
      const res = await fetch(`http://localhost:3010/search?code=${code}`);
      const data = await res.json();

      if (data.success && data.resultsFind.length > 0) {
        setCustomer(data.resultsFind[0]);
      } else {
        setError("No se encontró ningún cliente con ese código.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    }

    setLoading(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div style={styles.container}>
      {/* Título */}
      <div style={styles.header}>
        <span style={styles.icon}>🔎</span>
        <h2 style={styles.title}>Buscar Cliente por Código</h2>
      </div>
      <p style={styles.subtitle}>
        Encuentra información detallada de un cliente en la base de datos
      </p>

      {/* Área de búsqueda */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Ingresa el código del cliente…"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleEnter}
          style={styles.input}
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {/* Error */}
      {error && <div style={styles.error}>{error}</div>}

      {/* Resultado */}
      {customer && (
        <div style={styles.resultCard}>
          <h3 style={styles.resultName}>{customer.name}</h3>

          <div style={styles.grid}>
            <div style={styles.item}>
              <p style={styles.label}>ID</p>
              <p style={styles.value}>{customer.id}</p>
            </div>

            <div style={styles.item}>
              <p style={styles.label}>Código</p>
              <p style={styles.value}>{customer.code}</p>
            </div>

            <div style={styles.item}>
              <p style={styles.label}>Teléfono</p>
              <p style={styles.value}>{customer.phone ?? "N/A"}</p>
            </div>

            <div style={styles.item}>
              <p style={styles.label}>Dirección</p>
              <p style={styles.value}>{customer.address ?? "N/A"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


const styles = {
  container: {
    width: "100%",
    padding: 30,
    background: "#0f1115",
    color: "#e6e9ef",
    borderRadius: 16,
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 4,
  },

  icon: { fontSize: 26 },
  title: { fontSize: 24, fontWeight: 700 },
  subtitle: { fontSize: 14, color: "#9aa3ad", marginBottom: 22 },

  searchBox: {
    background: "rgba(255,255,255,0.05)",
    padding: 20,
    borderRadius: 16,
    display: "flex",
    gap: 14,
    backdropFilter: "blur(6px)",
    marginBottom: 18,
    border: "1px solid rgba(255,255,255,0.06)",
  },

  input: {
    flex: 1,
    padding: "12px 16px",
    background: "#1a1d23",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    color: "#ffffff",
    fontSize: 15,
    outline: "none",
  },

  button: {
    padding: "12px 24px",
    background: "linear-gradient(90deg, #7c5cff, #6243ff)",
    color: "white",
    borderRadius: 10,
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    transition: "0.25s",
  },

  error: {
    background: "rgba(255,80,80,0.15)",
    color: "#ff6b6b",
    border: "1px solid rgba(255,80,80,0.3)",
    padding: "10px 16px",
    borderRadius: 10,
    marginBottom: 12,
  },

  resultCard: {
    marginTop: 10,
    background: "linear-gradient(135deg, #7c5cff30, #3a2b7040)",
    padding: 24,
    borderRadius: 20,
    boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
  },

  resultName: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 20,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  },

  item: {
    background: "rgba(255,255,255,0.08)",
    padding: 14,
    borderRadius: 12,
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  label: {
    color: "#c5c8d0",
    fontSize: 11,
    textTransform: "uppercase",
    marginBottom: 6,
  },

  value: {
    fontSize: 18,
    fontWeight: 600,
    color: "white",
  },
};
