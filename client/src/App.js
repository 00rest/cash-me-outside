import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navigation/Navbar.js";
import Home from './pages/Home.js';
import Transfer from './pages/Transfer.js';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} /> 
        <Route path='/transfer' element={<Transfer />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
