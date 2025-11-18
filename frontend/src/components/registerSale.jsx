import { useState } from "react";

export default function RegisterSaleFromSearchStyle() {
  const [amount, setAmount] = useState("");
  const [idCustomer, setIdCustomer] = useState("");
  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSale(null);

    if (!amount || !idCustomer) {
      setError("Por favor completa ambos campos: amount e id_customer.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3010/sales/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          id_customer: idCustomer,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "No se pudo registrar la venta.");
      } else {
        // El endpoint devuelve sale en data.sale según tu backend
        setSale(data.sale ?? data);
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div style={styles.container}>
      {/* TÍTULO */}
      <div style={styles.header}>
        <h2 style={styles.title}>Registrar Nueva Venta</h2>
      </div>
      <p style={styles.subtitle}>Registra una venta rápida asociada a un cliente existente</p>

      {/* FORM */}
      <div style={styles.searchBox}>
        <input
          type="number"
          step="0.01"
          placeholder="Monto (ej. 150.50)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={handleEnter}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="ID del cliente (ej. 12)"
          value={idCustomer}
          onChange={(e) => setIdCustomer(e.target.value)}
          onKeyDown={handleEnter}
          style={{ ...styles.input, maxWidth: 220 }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </div>

      {/* ERROR */}
      {error && <div style={styles.error}>{error}</div>}

      {/* RESULTADO (sale) */}
      {sale && (
        <div style={styles.resultCard}>
          <h3 style={styles.resultName}>Venta registrada</h3>

          <div style={styles.grid}>
            <div style={styles.item}>
              <p style={styles.label}>ID Venta</p>
              <p style={styles.value}>{sale.id ?? sale.sale_id ?? "—"}</p>
            </div>

            <div style={styles.item}>
              <p style={styles.label}>Monto</p>
              <p style={styles.value}>${parseFloat(sale.amount ?? sale.monto ?? 0).toLocaleString()}</p>
            </div>

            <div style={styles.item}>
              <p style={styles.label}>ID Cliente</p>
              <p style={styles.value}>{sale.id_customer ?? sale.id_customer ?? "—"}</p>
            </div>

            <div style={styles.item}>
              <p style={styles.label}>Fecha</p>
              <p style={styles.value}>
                {sale.created_at ? new Date(sale.created_at).toLocaleString() : (sale.createdAt ? new Date(sale.createdAt).toLocaleString() : "—")}
              </p>
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
    alignItems: "center",
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
    boxShadow: "0 2px 10px rgba(124,92,255,0.35)",
    transition: "transform 120ms ease",
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
