import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import MyAccount from './pages/MyAccount';
import ContactUs from './pages/Contact';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Hotelpage from './pages/Hotelpage';
import Flightpage from './pages/Flightpage.js';
import Trainpage from './pages/Trainpage';
import {  CookiesProvider, useCookies, } from 'react-cookie';
import PNRcomponent from './Components/PNRcomponent.jsx';

function App() {
  return (
    <CookiesProvider>
      <Main />
    </CookiesProvider>
  );
}

function Main() {
  const [ cookies ] = useCookies(["token"]);

  return (
      <Router>{
        cookies.token ?
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/trainPnr" element={<PNRcomponent />} />
          <Route path="/flights" element={<Flightpage />} />
          <Route path="/hotels" element={<Hotelpage />} />
          <Route path="/trains" element={<Trainpage />} />
          <Route path='*' element={ <Navigate to='/' /> } />
        </Routes> :
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/trainPnr" element={<PNRcomponent />} />
          <Route path="/flights" element={<Flightpage />} />
          <Route path="/hotels" element={<Hotelpage />} />
          <Route path="/trains" element={<Trainpage />} />
          <Route path='*' element={ <Navigate to='/' /> } />
          
        </Routes>
      }
      </Router>
  );
}

export default App;
