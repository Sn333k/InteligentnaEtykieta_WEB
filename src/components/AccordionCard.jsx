import React from "react";

export default function AccordionCard({ title, isOpen, onToggle, children }) {
  return (
    <div className="card" style={{ marginBottom: 10 }}>
      <div
        onClick={onToggle}
        style={{
          cursor: "pointer",
          fontWeight: "bold",
          padding: "0.5rem 0",
          borderBottom: "1px solid #ccc",
        }}
      >
        {title}
      </div>
      {isOpen && <div style={{ paddingTop: 10 }}>{children}</div>}
    </div>
  );
}
