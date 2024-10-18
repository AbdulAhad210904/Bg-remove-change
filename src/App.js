import React, { useState } from 'react';

function App() {
  const [textPrompt, setTextPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setTextPrompt(event.target.value);
  };

  const generateImage = async () => {
    if (!textPrompt) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev", {
        method: 'POST',
        headers: {
          'Authorization': process.env.REACT_APP_HUGGINGFACE_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: textPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImage(imageUrl);

    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>AI Image Generator (FLUX.1-dev)</h1>

      <input
        type="text"
        placeholder="Enter a text prompt..."
        value={textPrompt}
        onChange={handleInputChange}
        style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
      />
      <br />

      <button onClick={generateImage} disabled={loading} style={{ marginTop: '20px' }}>
        {loading ? 'Generating image...' : 'Generate Image'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {generatedImage && (
        <div style={{ marginTop: '20px' }}>
          <img src={generatedImage} alt="Generated" style={{ width: '300px', height: 'auto' }} />
          <br />
          <a href={generatedImage} download="generated-image.png">
            <button style={{ marginTop: '10px' }}>Download Image</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
