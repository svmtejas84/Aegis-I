// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// This is the standard entry point for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);