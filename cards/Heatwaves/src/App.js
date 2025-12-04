// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import HeatwavesPage from './pages/HeatwavesPage'; // <-- 1. IMPORT YOUR NEW PAGE

// Import your main CSS file
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        {/* You can add navigation links here to switch between pages
          <nav style={{ padding: '1rem', textAlign: 'center' }}>
            <a href="/heatwave" style={{ margin: '0 1rem' }}>Heatwave Story</a>
          </nav> 
        */}

        <Routes>
          {/* Route for the Landslide page */}
          
          {/* 2. ADD THIS NEW ROUTE for the Heatwaves page */}
          <Route path="/heatwave" element={<HeatwavesPage />} />
          
          {/* This makes the default homepage (path="/") show the Landslide page.
            You can change this to point to "/heatwave" if you prefer.
          */}
          <Route path="/" element={<HeatwavesPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
