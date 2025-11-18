import React, { useState } from "react";

export default function TopBar() {
  const [active, setActive] = useState("Ventas");
  const items = ["Buscar cliente", "Clientes", "Nueva venta", "Venta por cliente", "Ventas"];

  const btnBase = {
    background: "transparent",
    border: "none",
    padding: "8px 12px",
    fontSize: 15,
    fontWeight: 600,
    color: "inherit",
    cursor: "pointer",
    position: "relative",
    outline: "none",
    transition: "color 160ms ease",
  };

  const underline = {
    position: "absolute",
    left: 0,
    right: 0,
    height: 3,
    bottom: -6,
    borderRadius: 3,
    transition: "transform 220ms ease, opacity 180ms ease",
    transformOrigin: "left center",
  };

  return (
    <nav className="topbar" aria-label="main navigation">
      <div className="topbar-left">
        <span style={{ color: "#f6b93b", fontSize: 18 }}>:D</span>
        <span className="topbar-title">Laboratorio 10</span>
      </div>

      <div className="topbar-menu">
        {items.map((it) => {
          const isActive = it === active;
          return (
            <button
              key={it}
              onClick={() => setActive(it)}
              style={{
                ...btnBase,
                color: isActive ? "#ffffff" : "#9aa3ad",
              }}
            >
              {it}

              <span
                style={{
                  ...underline,
                  background: "#7c5cff",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "scaleX(1)" : "scaleX(0)",
                }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
