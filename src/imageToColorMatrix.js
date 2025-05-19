export async function imageToColorMatrix(file) {
  const img = new Image();
  img.src = URL.createObjectURL(file);

  await new Promise(resolve => img.onload = resolve);

  const canvas = document.createElement('canvas');
  canvas.width = 296;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, 296, 128);

  const { data } = ctx.getImageData(0, 0, 296, 128);
  const matrix = [];

  for (let y = 0; y < 128; y++) {
    const row = [];
    for (let x = 0; x < 296; x++) {
      const i = (y * 296 + x) * 4;
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]];

      if (r > 100 && g < 80 && b < 80) row.push('red');
      else if (r < 100 && g < 100 && b < 100) row.push('black');
      else row.push('white');
    }
    matrix.push(row);
  }

  return matrix;
}
