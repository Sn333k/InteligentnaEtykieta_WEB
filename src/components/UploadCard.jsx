import React, { useState, useRef } from "react";

export default function UploadCard({ onSend }) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  return (
    <div
      style={{
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => setFile(e.target.files[0])}
        style={{ display: "none" }}
      />

      <button
        onClick={() => fileInputRef.current.click()}
      >
        Wybierz obraz
      </button>

      {file && <p style={{ fontSize: 14 }}>{file.name}</p>}

      <button
        disabled={!file}
        onClick={() => onSend(file)}
      >
        <span>Wyślij</span>
      </button>
    </div>
  );
}
