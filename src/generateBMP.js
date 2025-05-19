export function generateBMP_296x128(colorMatrix) {
  const width = 296;
  const height = 128;
  const rowSize = Math.ceil((24 * width) / 32) * 4;
  const imageSize = rowSize * height;
  const fileSize = 54 + imageSize;

  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  // Header
  view.setUint8(0, 0x42); // B
  view.setUint8(1, 0x4D); // M
  view.setUint32(2, fileSize, true);
  view.setUint32(10, 54, true); // pixel data offset

  // DIB header
  view.setUint32(14, 40, true); // header size
  view.setInt32(18, width, true);
  view.setInt32(22, -height, true); // top-down
  view.setUint16(26, 1, true); // color planes
  view.setUint16(28, 24, true); // bits per pixel
  view.setUint32(34, imageSize, true); // image size

  // Pixel data
  let offset = 54;
  const padding = rowSize - width * 3;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const color = colorMatrix[y][x];
      let r = 255, g = 255, b = 255;
      if (color === 'black') r = g = b = 0;
      else if (color === 'red') { r = 255; g = 0; b = 0; }

      view.setUint8(offset++, b);
      view.setUint8(offset++, g);
      view.setUint8(offset++, r);
    }
    offset += padding;
  }

  return new Blob([buffer], { type: 'image/bmp' });
}
