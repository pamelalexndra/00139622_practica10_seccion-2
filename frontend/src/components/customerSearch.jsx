import { useState } from "react";

export default function customerSearch() {
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
      const res = await fetch(`http://localhost:3010/search?code=${encodeURIComponent(code)}`);
      const data = await res.json();

      if (data?.success && Array.isArray(data.resultsFind) && data.resultsFind.length > 0) {
        setCustomer(data.resultsFind[0]);
      } else {
        setError("No se encontró ningún cliente con ese código.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.gradientDot} />
        <h2 style={styles.title}>Buscar Cliente por Código</h2>
      </div>

      <div style={styles.card}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Ingresa el código del cliente…"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleEnter}
            style={styles.input}
            aria-label="Código del cliente"
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            style={styles.button}
            aria-disabled={loading}
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {customer && (
          <div style={styles.resultCard}>
            <h3 style={styles.resultName}>{customer.name ?? "Sin nombre"}</h3>

            <div style={styles.grid}>
              <div style={styles.item}>
                <p style={styles.label}>ID</p>
                <p style={styles.value}>{customer.id ?? "—"}</p>
              </div>

              <div style={styles.item}>
                <p style={styles.label}>Código</p>
                <p style={styles.value}>{customer.code ?? "—"}</p>
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
    margin: 0,
  },

  subtitle: {
    fontSize: 13,
    color: "#9999bb",
    marginBottom: 18,
  },

  card: {
    borderRadius: 16,
    background: "#0e0e10",
    border: "1px solid #1d1d22",
    padding: 16,
    boxShadow: "0 6px 18px rgba(0,0,0,0.65)",
  },

  searchBox: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 14,
    width: "100%",
    boxSizing: "border-box",
  },

  input: {
    flex: 1,
    minWidth: 0, 
    padding: "12px 14px",
    background: "#14171d",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 10,
    color: "#eaeef6",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    flexShrink: 0,
    padding: "10px 16px",
    background: "linear-gradient(90deg, #7c5cff, #6243ff)",
    color: "white",
    borderRadius: 10,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    transition: "transform 120ms ease",
  },

  error: {
    background: "rgba(255,80,80,0.12)",
    color: "#ff9b9b",
    border: "1px solid rgba(255,80,80,0.25)",
    padding: "10px 14px",
    borderRadius: 10,
    marginBottom: 12,
  },

  resultCard: {
    marginTop: 6,
    background: "linear-gradient(135deg, #7c5cff22, #3a2b7040)",
    padding: 18,
    borderRadius: 14,
    boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
  },

  resultName: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 14,
    color: "#fff",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },

  item: {
    background: "rgba(255,255,255,0.03)",
    padding: 12,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.04)",
    boxSizing: "border-box",
  },

  label: {
    color: "#c5c8d0",
    fontSize: 11,
    textTransform: "uppercase",
    marginBottom: 6,
  },

  value: {
    fontSize: 16,
    fontWeight: 700,
    color: "#ffffff",
    wordBreak: "break-word", 
  },
};
