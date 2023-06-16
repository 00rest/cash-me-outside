import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navigation/Navbar.js";
import Home from './pages/Home.js';
import { Orest, Orest2, Orest3 } from './pages/orest.js';
import Transfer from './pages/Transfer.js';
import Accounts from './pages/Accounts.js';
import Withdraw from './pages/Withdraw.js';
import Footer from './pages/Footer';
import Zelle from './pages/Zelle.js';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import auth from './utils/auth';
import NewAccount from './pages/NewAccount';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const session = auth.getSession();

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        {session.userId && <Navbar />}
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
        {session.userId &&
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/transfer' element={<Transfer />} />
            <Route path='/getcash' element={<Withdraw />} />
            <Route path='/zelle' element={<Zelle />} />
            <Route path='/orest' element={<Orest />} />
            <Route path='/orest2' element={<Orest2 />} />
            <Route path='/orest3' element={<Orest3 />} />
            <Route path='/accountactivity' element={<Accounts />} />
            <Route path='/new-account' element={<NewAccount />} />
          </Routes>}
        <Footer />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
