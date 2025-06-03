import React, { useState } from "react";

export default function UploadCard({ onSend }) {
  const [file, setFile] = useState(null);

  return (
    <details className="card">
      <summary>Prześlij swoje zdjęcie</summary>
      <div>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <button disabled={!file} onClick={() => onSend(file)}>
          Wyślij
        </button>
      </div>
    </details>
  );
}
