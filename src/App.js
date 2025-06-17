
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './components/dashboard';
import PageTemplate from './pages/PageTemplate';

const App = () => (
  <BrowserRouter>
    <Routes> 
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/page/:pageName" element={<PageTemplate />} />
    </Routes>
  </BrowserRouter>
);

export default App;
