import React, { useState } from "react";

export default function topBar() {
  const [active, setActive] = useState("Ventas");
  const items = ["Buscar cliente", "Clientes", "Nueva venta", "Venta por cliente", "Ventas"];

  const barStyle = {
    width: "100vw",               
    background: "#0b0d0f",
    color: "#cbd5e1",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    padding: "14px 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",

    position: "fixed",            
    top: 0,                       
    left: 0,                      
    zIndex: 9999,                 
  };

  const titleStyle = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 18,
    fontWeight: 600,
    color: "#e6eef8",
  };

  const menuStyle = {
    display: "flex",
    gap: 18,
    alignItems: "center",
  };

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
    <nav style={barStyle} aria-label="main navigation">
      <div style={titleStyle}>
        <span style={{ color: "#f6b93b", fontSize: 18 }}>:D</span>
        <span>Laboratorio 10 </span>
      </div>

      <div style={menuStyle}>
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
