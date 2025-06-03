import React from "react";

export default function ProgressModal({ progress, onClose }) {
  if (!progress) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#ffffff",
          color: "#000000",
          padding: 20,
          borderRadius: 8,
          width: "80%",
          maxWidth: 300,
          textAlign: "center",
        }}
      >
        {progress.error ? (
          <>
            <p style={{ color: "red", marginBottom: 10 }}>Błąd przetwarzania</p>
            <button onClick={onClose}>Zamknij</button>
          </>
        ) : (
          <>
            <p style={{ marginBottom: 10 }}>
              {progress.percent < 100
                ? `Wysyłanie… ${progress.percent}%`
                : "Zakończono!"}
            </p>
            {progress.percent < 100 ? (
              <progress value={progress.percent} max={100} style={{ width: "100%" }} />
            ) : (
              <button onClick={onClose}>Zamknij</button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
