import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import PrivateRoutes from './utils/privateRoutes';
import React from 'react';

// Import your background image
import backgroundImage from './wp9497769.jpg'; 

function App() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '140vh',
    color: 'black',
    opacity: '90%'
    
    
  
  };

  return (
    <div style={backgroundStyle}>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="*" element={<h1>Not Found!</h1>} />
          {/* Protected Routes */}
          <Route element={<PrivateRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


