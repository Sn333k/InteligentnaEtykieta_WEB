import React, { useState, useRef } from "react";
import { generatePBM_P4 } from "./imageToPBM";
import "./App.css";



function convertCanvasToBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

function App() {
  const [imageFile, setImageFile] = useState(null);
  const paintCanvasRef = useRef(null);
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [uploadProgress, setUploadProgress] = useState(null);
  const isDrawing = useRef(false);

  const draw = (clientX, clientY) => {
    const canvas = paintCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const handlePointerDown = (e) => {
    isDrawing.current = true;
    draw(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    if (isDrawing.current) draw(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  const clearPaint = () => {
    const ctx = paintCanvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 200, 200);
  };

  // === Wspólna logika wysyłania ===
  const sendBlob = async (blob) => {
  //setStatus("Przetwarzanie...");
  setUploadProgress({ percent: 0, error: false }); // pokaż okno z postępem
  try {
    const pbmBlob = await generatePBM_P4(blob);
    const formData = new FormData();
    formData.append("image", new File([pbmBlob], "image.pbm"));

    // XMLHttpRequest pozwala śledzić postęp
    await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://192.168.4.1/upload");
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setUploadProgress({ percent, error: false });
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          //setStatus("Obraz PBM wysłany!");
          setUploadProgress({ percent: 100, error: false });
          setTimeout(() => setUploadProgress(null), 1500);
          resolve();
        } else {
          //setStatus("Błąd podczas wysyłania.");
          setUploadProgress(null);
          setUploadProgress({ error: true });
          reject(new Error("Upload error"));
        }
      };
      xhr.onerror = () => {
        //setStatus("Błąd podczas wysyłania.");
        setUploadProgress(null);
        setUploadProgress({ error: true });
        reject(new Error("Network error"));
      };
      xhr.send(formData);
    });
  } catch (err) {
    console.error(err);
    //setStatus("Błąd podczas przetwarzania.");
    setUploadProgress(null);
    setUploadProgress({ error: true });
  }
};


  const handleSendImage = async () => {
    if (imageFile) await sendBlob(imageFile);
  };

  const handleSendPaint = async () => {
    const blob = await convertCanvasToBlob(paintCanvasRef.current);
    await sendBlob(blob);
  };

   const handleSendText = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = "#000000";
    ctx.font = `${fontSize}px monospace`;
    const lineHeight = fontSize + 2;
    const lines = text.split("\n");
    lines.forEach((line, i) =>
      ctx.fillText(line, 5, lineHeight + i * lineHeight)
    );

    const blob = await convertCanvasToBlob(canvas);
    await sendBlob(blob);
  };

  return (
    <div className="container">
      {uploadProgress && (
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
    {uploadProgress.error ? (
      <>
        <p style={{ marginBottom: 10, color: "red" }}>Błąd przetwarzania</p>
        <button onClick={() => setUploadProgress(null)}>Zamknij</button>
      </>
    ) : (
      <>
        <p style={{ marginBottom: 10 }}>
          {uploadProgress.percent < 100
            ? `Wysyłanie... ${uploadProgress.percent}%`
            : "Zakończono!"}
        </p>
        {uploadProgress.percent < 100 ? (
          <progress value={uploadProgress.percent} max={100} style={{ width: "100%" }} />
        ) : (
          <button onClick={() => setUploadProgress(null)}>Zamknij</button>
        )}
      </>
    )}
  </div>
</div>
    )}
      <h1>Inteligentna Etykieta</h1>

      {/* Upload & convert */}
      <details className="card">
        <summary>Prześlij swoje zdjęcie</summary>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <button disabled={!imageFile} onClick={handleSendImage}>
            <span>Wyślij</span>
          </button>
        </div>
      </details>

      {/* Paint editor */}
      <details className="card">
        <summary>Narysuj</summary>
        <div>
          <canvas
            ref={paintCanvasRef}
            width={200}
            height={200}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />
          <div>
            <button onClick={clearPaint}>Wyczyść</button>
            <button onClick={handleSendPaint}><span>Wyślij</span></button>
          </div>
        </div>
      </details>

      {/* Text editor */}
<details className="card">
  <summary style={{ cursor: "pointer", fontSize: "1.2rem" }}>
    Edytor tekstowy
  </summary>
  <div
    style={{
      marginTop: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <label style={{ marginBottom: 5 }}>
      Rozmiar czcionki: {fontSize}px
    </label>
    <input
      type="range"
      min="8"
      max="32"
      step="1"
      value={fontSize}
      onChange={(e) => setFontSize(parseInt(e.target.value))}
      style={{ width: 200, marginBottom: 10 }}
    />
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Wpisz treść (Enter = nowa linia)"
      style={{
      width: 200,
      height: 200,
      padding: 8,
      borderRadius: 8,
      resize: "none",
      fontSize: `${fontSize}px`,
      fontFamily: "monospace",
      boxSizing: "border-box",
      }}
    />
    <button onClick={handleSendText}>
      <span>Wyślij</span>
    </button>
  </div>
</details>
    </div>
  );
}

export default App;
