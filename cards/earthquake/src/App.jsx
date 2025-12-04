// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EarthquakePage from './pages/EarthquakePage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to earthquake page */}
        <Route path="/" element={<Navigate to="/earthquake" replace />} />
        <Route path="/earthquake" element={<EarthquakePage />} />
      </Routes>
    </Router>
  );
}

export default App;