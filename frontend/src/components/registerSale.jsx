import { useState } from "react";

export default function RegisterSaleFromSearchStyle() {
  const [amount, setAmount] = useState("");
  const [idCustomer, setIdCustomer] = useState("");
  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatAmount = (val) => {
    const n = parseFloat(val || 0);
    return n.toLocaleString("es-SV", { style: "currency", currency: "USD" });
  };

  const formatDate = (raw) => {
    try {
      if (!raw) return "—";
      const d = new Date(raw);
      return d.toLocaleDateString("es-SV", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) + " " + d.toLocaleTimeString("es-SV", { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "—";
    }
  };

  const handleSubmit = async () => {
    setError("");
    setSale(null);

    if (!amount || !idCustomer) {
      setError("Por favor completa ambos campos: monto e ID del cliente.");
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

      if (!data?.success) {
        setError(data?.message || "No se pudo registrar la venta.");
      } else {
        // El endpoint puede devolver data.sale o data directamente
        setSale(data.sale ?? data);
        // limpiar inputs opcionalmente:
        // setAmount("");
        // setIdCustomer("");
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
      <div style={styles.header}>
        <div style={styles.gradientDot} />
        <h2 style={styles.title}>Registrar Nueva Venta</h2>
      </div>

      <div style={styles.card}>
        <div style={styles.formRow}>
          <input
            type="number"
            step="0.01"
            placeholder="Monto (ej. 150.50)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={handleEnter}
            style={styles.input}
            aria-label="Monto"
          />

          <input
            type="number"
            placeholder="ID del cliente (ej. 12)"
            value={idCustomer}
            onChange={(e) => setIdCustomer(e.target.value)}
            onKeyDown={handleEnter}
            style={{ ...styles.input, maxWidth: 220 }}
            aria-label="ID del cliente"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={styles.button}
            aria-disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

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
                <p style={styles.value}>{formatAmount(sale.amount ?? sale.monto ?? amount)}</p>
              </div>

              <div style={styles.item}>
                <p style={styles.label}>ID Cliente</p>
                <p style={styles.value}>{sale.id_customer ?? sale.id_customer ?? idCustomer}</p>
              </div>

              <div style={styles.item}>
                <p style={styles.label}>Fecha</p>
                <p style={styles.value}>
                  {sale.created_at ? formatDate(sale.created_at) : (sale.createdAt ? formatDate(sale.createdAt) : "—")}
                </p>
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

  formRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
    marginBottom: 12,
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
    padding: "10px 18px",
    background: "linear-gradient(90deg, #7c5cff, #6243ff)",
    color: "white",
    borderRadius: 10,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(124,92,255,0.25)",
    transition: "transform 120ms ease, opacity 120ms ease",
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
    marginTop: 10,
    background: "linear-gradient(135deg, #7c5cff22, #3a2b7040)",
    padding: 18,
    borderRadius: 14,
    boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
  },

  resultName: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 12,
    color: "#fff",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 14,
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
