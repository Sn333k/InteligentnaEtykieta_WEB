import React, { useRef } from "react";
import { convertCanvasToBlob } from "../utils/canvasUtils";

export default function PaintEditor({ onSend }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const draw = (x, y) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(x - rect.left, y - rect.top, 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const clear = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 200, 200);
  };

  const send = async () => {
    const blob = await convertCanvasToBlob(canvasRef.current);
    onSend(blob);
  };

  return (
      <div>
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
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
          <button onClick={send}>Wyślij</button>
        </div>
      </div>
  );
}
