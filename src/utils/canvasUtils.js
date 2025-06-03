// Konwersja canvasa do Blob
export const convertCanvasToBlob = (canvas) =>
  new Promise((resolve) => canvas.toBlob(resolve, "image/png"));