import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navigation/Navbar.js";
import Home from './pages/Home.js';
import Transfer from './pages/Transfer.js';
import Accounts from './pages/Accounts.js';
import Footer from './pages/Footer';
import Zelle from './pages/Zelle.js';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login';

function App() {

const x = 1;

if (x === 0){
return (<Login/>);
}else{
  return (
  
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} /> 
        <Route path='/transfer' element={<Transfer />} /> 
        <Route path='/account' element={<Accounts />} /> 
        <Route path='/zelle' element={<Zelle />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
};

export default App;
