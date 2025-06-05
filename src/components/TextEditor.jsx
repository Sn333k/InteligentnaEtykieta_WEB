import React, { useState } from "react";
import { convertCanvasToBlob } from "../utils/canvasUtils";

export default function TextEditor({ onSend }) {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState("monospace");

  const send = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = "#000";
    ctx.font = `${fontSize}px ${fontFamily}`;
    const lh = fontSize + 2;
    text.split("\n").forEach((line, i) => {
      const y = lh + i * lh;
      if (y < 200) ctx.fillText(line, 5, y);
    });

    const blob = await convertCanvasToBlob(canvas);
    onSend(blob);
  };

  return (
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
        min="20"
        max="40"
        value={fontSize}
        onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
        style={{ width: 200, marginBottom: 10 }}
      />

      <label style={{ marginBottom: 5 }}>Rodzaj czcionki:</label>
      <select
        value={fontFamily}
        onChange={(e) => setFontFamily(e.target.value)}
        style={{ width: 200, marginBottom: 10 }}
      >
        <option value="monospace">Monospace</option>
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
      </select>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Wpisz treść"
        style={{
          width: 220,
          height: 220,
          padding: 8,
          resize: "none",
          fontSize: `${fontSize}px`,
          fontFamily,
          boxSizing: "border-box",
        }}
      />
      <button onClick={send}>
        <span>Wyślij</span>
      </button>
    </div>
  );
}
