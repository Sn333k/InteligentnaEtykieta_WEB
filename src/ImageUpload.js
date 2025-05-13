import React, { useState } from 'react';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // podgląd
    }
  };

   /*const handleUpload = () => {
    if (!image) return;

    // Przygotowanie danych do wysyłki
    const formData = new FormData();
    formData.append('image', image);

    // TODO: wyślij do backendu (przykład z fetch)
   fetch('http://localhost:9090/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Obrazek wysłany!');
        console.log(data);
      })
      .catch((err) => {
        console.error('Błąd podczas wysyłania', err);
      });
  };*/

  return (
    <div style={{textAlign: 'center' }}>
      <h3>Wgraj zdjęcie:</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <div style={{ marginTop: '10px' }}>
          <img src={previewUrl} alt="Podgląd" width={300} />
        </div>
      )}
      <button /*onClick={handleUpload}*/ disabled={!image} style={{ marginTop: '10px' }}>
        Wyślij zdjęcie
      </button>
    </div>
  );
}

export default ImageUpload;

