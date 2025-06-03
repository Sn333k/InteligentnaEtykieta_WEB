import React, { useState } from 'react';
import { generatePBM_P4 } from './imageToPBM';

function App() {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSend = async () => {
    if (!image) return;
    setStatus('Przetwarzanie...');

    try {
      const pbmBlob = await generatePBM_P4(image);

      const formData = new FormData();
      formData.append('image', new File([pbmBlob], 'image.pbm'));

      const response = await fetch('http://192.168.4.1/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('Obraz PBM wysłany!');
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
      <h2>Wgraj obraz (PBM 200×200)</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <button
        onClick={handleSend}
        disabled={!image}
        style={{ marginTop: '10px', padding: '8px 20px' }}
      >
        Wyślij do ESP32
      </button>

      <p style={{ marginTop: '10px', color: 'green' }}>{status}</p>
    </div>
  );
}

export default App;
