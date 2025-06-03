export async function generatePBM_P4(file) {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  await new Promise(resolve => img.onload = resolve);

  const size = 200;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Rysowanie i konwersja na czarno-biały
  ctx.drawImage(img, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);

  const bytes = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x += 8) {
      let byte = 0;
      for (let bit = 0; bit < 8; bit++) {
        const px = x + bit;
        const i = (y * size + px) * 4;
        const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        const isBlack = gray < 128;
        byte |= (isBlack ? 1 : 0) << (7 - bit);
      }
      bytes.push(byte);
    }
  }

  // Nagłówek PBM (P4)
  const header = `P4\n${size} ${size}\n`;
  const encoder = new TextEncoder();
  const headerBytes = encoder.encode(header);

  const allBytes = new Uint8Array(headerBytes.length + bytes.length);
  allBytes.set(headerBytes, 0);
  allBytes.set(bytes, headerBytes.length);

  return new Blob([allBytes], { type: 'application/octet-stream' });
}
