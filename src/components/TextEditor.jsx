import React, { useState } from "react";
import { convertCanvasToBlob } from "../utils/canvasUtils";

export default function TextEditor({ onSend }) {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);

  const send = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = "#000";
    ctx.font = `${fontSize}px monospace`;
    const lh = fontSize + 2;
    text.split("\n").forEach((line, i) => ctx.fillText(line, 5, lh + i * lh));

    const blob = await convertCanvasToBlob(canvas);
    onSend(blob);
  };

  return (
      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <label style={{ marginBottom: 5 }}>Rozmiar czcionki: {fontSize}px</label>
        <input
          type="range"
          min="8"
          max="32"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
          style={{ width: 200, marginBottom: 10 }}
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Wpisz treść"
          style={{
            width: 200,
            height: 200,
            padding: 8,
            resize: "none",
            fontSize: `${fontSize}px`,
            fontFamily: "monospace",
            boxSizing: "border-box",
          }}
        />
        <button onClick={send}>Wyślij</button>
      </div>
  );
}
