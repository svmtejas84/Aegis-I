// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your new page component
import CyclonePage from './pages/CyclonePage.jsx';

// You might have other pages, like a Homepage
// import HomePage from './pages/HomePage'; 

// Import your main CSS file
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/cyclone" element={<CyclonePage />} />
          <Route path="/" element={<CyclonePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
