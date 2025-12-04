// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import UrbanfloodsPage from './pages/UrbanfloodsPage';

// Import your main CSS file
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        {/* You can add navigation links here to switch between pages
          <nav style={{ padding: '1rem', textAlign: 'center' }}>
            <a href="/urbanflood" style={{ margin: '0 1rem' }}>Urban Flood Story</a>
          </nav> 
        */}

        <Routes>
          {/* Route for the Urbanfloods page */}
          <Route path="/urbanflood" element={<UrbanfloodsPage />} />
          
          {/* This makes the default homepage (path="/") show the Urbanfloods page.
          */}
          <Route path="/" element={<UrbanfloodsPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

