// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import LandslidePage from './pages/LandslidePage.jsx'; // Import the new page

// You might have other pages, like a Homepage
// import HomePage from './pages/HomePage'; 

// Import your main CSS file
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        {/* It's a good idea to add navigation links
          so users can find all your different story pages.
          <nav style={{ padding: '1rem', textAlign: 'center' }}>
            <a href="/landslide" style={{ margin: '0 1rem' }}>Landslide Story</a>
          </nav> 
        */}

        <Routes>
          {/* Route for the Cyclone page */}
          
          {/* NEW: Route for the Landslide page */}
          <Route path="/landslide" element={<LandslidePage />} />
          
          {/* This makes the default homepage (path="/") show the Cyclone page.
            You can change this to show a different page if you prefer.
          */}
          <Route path="/" element={<LandslidePage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
