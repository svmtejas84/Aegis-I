// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import BhopalgasPage from './pages/BhopalgasPage'; 

// Import your main CSS file
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        {/* You can add navigation links here to switch between pages
          <nav style={{ padding: '1rem', textAlign: 'center' }}>
            <a href="/bhopalgas" style={{ margin: '0 1rem' }}>Bhopal Gas Story</a>
          </nav> 
        */}

        <Routes>
          {/* Route for the Bhopalgas page */}
          <Route path="/bhopalgas" element={<BhopalgasPage />} />
          
          {/* This makes the default homepage (path="/") show the Bhopalgas page.
          */}
          <Route path="/" element={<BhopalgasPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

