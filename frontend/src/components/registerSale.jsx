import { useState } from "react";
import "../styles/index.css";

export default function registerSale() {
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
      return (
        d.toLocaleDateString("es-SV", { day: "2-digit", month: "2-digit", year: "numeric" }) +
        " " +
        d.toLocaleTimeString("es-SV", { hour: "2-digit", minute: "2-digit" })
      );
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
      const res = await fetch("http://localhost:3010/sales", {
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
        setSale(data.sale ?? data);
      }
    } catch {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h2 className="title">Registrar Nueva Venta</h2>
      </div>

      <div className="card">
        <div className="form-row">
          <input
            className="input"
            type="number"
            step="0.01"
            placeholder="Monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            className="input"
            style={{ maxWidth: 220 }}
            type="number"
            placeholder="ID del cliente"
            value={idCustomer}
            onChange={(e) => setIdCustomer(e.target.value)}
          />
          <button className="btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </div>

        {error && <div className="error-box">{error}</div>}

        {sale && (
          <div className="result-card">
            <h3 className="result-title">Venta registrada</h3>

            <div className="grid">
              <div className="item">
                <p className="label">ID Venta</p>
                <p className="value">{sale.id ?? sale.sale_id ?? "—"}</p>
              </div>

              <div className="item">
                <p className="label">Monto</p>
                <p className="value">{formatAmount(sale.amount ?? sale.monto ?? amount)}</p>
              </div>

              <div className="item">
                <p className="label">ID Cliente</p>
                <p className="value">{sale.id_customer ?? idCustomer}</p>
              </div>

              <div className="item">
                <p className="label">Fecha</p>
                <p className="value">
                  {sale.created_at ? formatDate(sale.created_at) : sale.createdAt ? formatDate(sale.createdAt) : "—"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
