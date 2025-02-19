// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PDFConverter from './components/PDFConverter';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PDFConverter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;