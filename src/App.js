import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BackgroundRemover from './BackgroundRemover';
import ImageGenerator from './ImageGenerator';

function App() {
  return (
    <Router>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>AI Tools</h1>

        <nav style={{ marginBottom: '20px' }}>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/bgremover">Background Remover</StyledLink>
          <StyledLink to="/imagegenerator">Image Generator</StyledLink>
        </nav>

        <Routes>
          <Route path="/bgremover" element={<BackgroundRemover />} />
          <Route path="/imagegenerator" element={<ImageGenerator />} />
          <Route path="/" element={<h2>Select a Tool from the Menu</h2>} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

// Styling
const buttonStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  margin: '5px',
  backgroundColor: '#007BFF',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '5px',
  transition: 'background-color 0.3s, transform 0.3s',
  fontSize: '16px',
};

const hoverStyle = {
  backgroundColor: '#0056b3', // Darker shade for hover effect
  transform: 'scale(1.05)',
};

const StyledLink = ({ to, children }) => (
  <Link
    to={to}
    style={buttonStyle}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
  >
    {children}
  </Link>
);

export default App;
