// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import ChernobylPage from './pages/ChernobylPage'; // <-- 1. IMPORT YOUR NEW PAGE

// Import your main CSS file
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        {/* You can add navigation links here to switch between pages
          <nav style={{ padding: '1rem', textAlign: 'center' }}>
            <a href="/chernobyl" style={{ margin: '0 1rem' }}>Chernobyl Story</a>
          </nav> 
        */}

        <Routes>
          
          {/* 2. ADD THIS NEW ROUTE for the Chernobyl page */}
          <Route path="/chernobyl" element={<ChernobylPage />} />
          
          {/* This makes the default homepage (path="/") show the Chernobyl page.
          */}
          <Route path="/" element={<ChernobylPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

