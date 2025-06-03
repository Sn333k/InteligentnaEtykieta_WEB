import React, { useState } from "react";

export default function UploadCard({ onSend }) {
  const [file, setFile] = useState(null);

  return (
    <div style={{ marginTop: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button disabled={!file} onClick={() => onSend(file)}><span>Wyślij</span></button>
    </div>
  );
}