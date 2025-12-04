// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import BhopalgasPage from './pages/BhopalgasPage.jsx'; 

// Import your main CSS file
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/bhopalgas" element={<BhopalgasPage />} />
          <Route path="/" element={<BhopalgasPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
