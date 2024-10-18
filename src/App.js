import React, { useState } from 'react';

function App() {
  const [photo, setPhoto] = useState(null);  // Store the uploaded photo
  const [processedImage, setProcessedImage] = useState(null); // Store the image with background removed
  const [loading, setLoading] = useState(false);  // Show loading indicator during API call

  // Handle image upload
  const handlePhotoUpload = (event) => {
    setPhoto(event.target.files[0]);
  };

  // Function to handle API call and remove background
  const removeBackground = () => {
    if (!photo) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image_file', photo);

    fetch('https://clipdrop-api.co/remove-background/v1', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.REACT_APP_CLIPDROP_API_KEY,
      },
      body: formData,
    })
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const blob = new Blob([buffer], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(blob);
        setProcessedImage(imageUrl);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Background Remover</h1>

      <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      <br />

      <button onClick={removeBackground} disabled={!photo || loading} style={{ marginTop: '20px' }}>
        {loading ? 'Removing background...' : 'Remove Background'}
      </button>

      {processedImage && (
        <div style={{ marginTop: '20px' }}>
          <img src={processedImage} alt="Processed" style={{ width: '300px', height: 'auto' }} />
          <br />
          <a href={processedImage} download="no-bg.png">
            <button style={{ marginTop: '10px' }}>Download Image</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
