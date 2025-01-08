import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductAddScreen from './pages/ProductAddScreen';
import Stok from './pages/Stok';
import Sales from './pages/Sales';




function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/urun-ekle" element={<ProductAddScreen />} />
          <Route path="/stok-islemleri" element={<Stok />} />
          <Route path="/satis" element={<Sales />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;