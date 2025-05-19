import React, { useState } from 'react';
import { imageToColorMatrix } from './imageToColorMatrix';
import { generateBMP_296x128 } from './generateBMP';

function App() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [bmpUrl, setBmpUrl] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setBmpUrl(null);
    }
  };

  const handleSend = async () => {
  if (!image) return;
  setStatus('Przetwarzanie...');

  try {
    const matrix = await imageToColorMatrix(image);
    const bmpBlob = generateBMP_296x128(matrix);
    
    // Pokaż podgląd BMP
    const bmpPreview = URL.createObjectURL(bmpBlob);
    setBmpUrl(bmpPreview);
    console.log("Prztoworzone");
    const response = await fetch('http://192.168.0.159/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body: bmpBlob,  // <-- wysyłasz czysty obraz BMP jako strumień
    
    });
    const text = await response.text();
    console.log("Odpowiedź ESP:", text);
    if (response.ok) {
      setStatus('Obraz wysłany do ESP32!');
    } else {
      setStatus('Błąd podczas wysyłania.');
    }
  } catch (err) {
    console.error(err);
    setStatus('Błąd podczas przetwarzania.');
  }
};
  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h2>Wgraj i wyślij obraz do ESP32</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      
      {previewUrl && (
        <div style={{ marginTop: 10 }}>
          <p>Oryginalny obraz:</p>
          <img src={previewUrl} alt="Preview" width={200} />
        </div>
      )}

      <button
        onClick={handleSend}
        disabled={!image}
        style={{ marginTop: '10px', padding: '8px 20px' }}
      >
        Wyślij obraz do ESP32
      </button>

      {bmpUrl && (
        <div style={{ marginTop: 20 }}>
          <p>Podgląd BMP:</p>
          <img src={bmpUrl} alt="BMP Preview" />
          <a href={bmpUrl} download="output.bmp">Pobierz BMP</a>
        </div>
      )}

      <p style={{ marginTop: '10px', color: 'green' }}>{status}</p>
    </div>
  );
}

export default App;
