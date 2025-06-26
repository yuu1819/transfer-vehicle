import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home';
import StationDetail from './station-detail';

ReactDOM.createRoot(document.getElementById('pagebody')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/station/:name" element={<StationDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
