import React, { useRef, useState, useEffect } from "react";
import { convertCanvasToBlob } from "../utils/canvasUtils";

export default function PaintEditor({ onSend }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [drawColor, setDrawColor] = useState('#000000');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [backgroundColor]);


  const draw = (x, y) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = drawColor;
    ctx.beginPath();
    ctx.arc(x - rect.left, y - rect.top, 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const send = async () => {
    const blob = await convertCanvasToBlob(canvasRef.current);
    onSend(blob);
  };

    const toggleColors = () => {
    setBackgroundColor((prev) => (prev === '#FFFFFF' ? '#000000' : '#FFFFFF'));
    setDrawColor((prev) => (prev === '#000000' ? '#FFFFFF' : '#000000'));
  };

  return (
      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          style={{ border: "1px solid #ccc", cursor: "crosshair" }}
          onPointerDown={(e) => {
          isDrawing.current = true;
          draw(e.clientX, e.clientY);
        }}
          onPointerMove={(e) => isDrawing.current && draw(e.clientX, e.clientY)}
          onPointerUp={() => (isDrawing.current = false)}
          onPointerLeave={() => (isDrawing.current = false)}
        />
        <div>
          <button onClick={clear}>Wyczyść</button>
          <button onClick={toggleColors}>Zamień kolor tła</button>
          <button onClick={send}><span>Wyślij</span></button>
          
        </div>
      </div>
  );
}