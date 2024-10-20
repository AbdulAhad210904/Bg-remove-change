import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BackgroundRemover from './BackgroundRemover';
import ImageGenerator from './ImageGenerator';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page (Landing Page) */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Tool Pages */}
        <Route path="/bgremover" element={<ToolPage tool="Background Remover" component={<BackgroundRemover />} />} />
        <Route path="/imagegenerator" element={<ToolPage tool="Image Generator" component={<ImageGenerator />} />} />
        
        <Route path="*" element={<h2 style={{ textAlign: 'center' }}>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

// Landing Page Component
const LandingPage = () => (
  <div className="landing-page">
    <div className="overlay">
      <div className="content">
        <h1>Welcome to AI Tools</h1>
        <div className="options">
          <StyledLink to="/bgremover">Background Remover</StyledLink>
          <StyledLink to="/imagegenerator">Image Generator</StyledLink>
        </div>
      </div>
    </div>
  </div>
);

// Tool Page Layout Component
const ToolPage = ({ tool, component }) => (
  <div className="tool-page">
    <nav className="tool-nav">
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/bgremover">Background Remover</StyledLink>
      <StyledLink to="/imagegenerator">Image Generator</StyledLink>
    </nav>
    <div className="tool-details">
      <h1>{tool}</h1>
      {component}
    </div>
  </div>
);

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
  backgroundColor: '#0056b3',
  transform: 'scale(1.05)',
};

// StyledLink component for the navigation
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
