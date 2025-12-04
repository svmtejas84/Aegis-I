import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TsunamiPage from './pages/tsunamiPage';

// A simple home page component
function HomePage() {
    return (
        <div style={{ padding: '50px' }}>
            <h1>Disaster Management Hub</h1>
            <nav>
                <Link to="/tsunami">Learn about Tsunamis</Link>
                <br />
                {/* <Link to="/earthquake">Learn about Earthquakes</Link> */}
            </nav>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Your Tsunami page will be at http://localhost:3000/tsunami */}
                <Route path="/tsunami" element={<TsunamiPage />} />
                
                {/* A homepage to navigate from */}
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;