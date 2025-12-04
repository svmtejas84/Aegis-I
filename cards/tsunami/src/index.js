import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your global styles
import App from './App';

// Find the <div> with id="root" in your public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your main App component into that div
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);