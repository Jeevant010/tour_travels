import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import MyAccount from './pages/MyAccount';
import ContactUs from './pages/Contact';
import Signup from './pages/Signup';
import Login from './pages/Login';
import HotelPage from './TravelPages/HotelPage';
import FlightPage from './TravelPages/FlightPage.jsx';
import TrainPage from './TravelPages/TrainPage';
import TaxiPage from './TravelPages/TaxiPage';
import RentalPage from './TravelPages/RentalPage';
import FlightOpt from './optiflight/FlightOpt';
import { CookiesProvider, useCookies } from 'react-cookie';
import PNRcomponent from './Components/PNRcomponent';

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
          <Route path="/flight" element={<FlightPage />} />
          <Route path="/hotel" element={<HotelPage />} />
          <Route path="/train" element={<TrainPage />} />
          <Route path="/taxi" element={<TaxiPage />} />
          <Route path="/rental" element={<RentalPage />} />
          <Route path="/OptFlight" element={<FlightOpt />} />
          <Route path='*' element={ <Navigate to='/' /> } />
        </Routes> :
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/trainPnr" element={<PNRcomponent />} />
          <Route path="/flight" element={<FlightPage />} />
          <Route path="/hotel" element={<HotelPage />} />
          <Route path="/train" element={<TrainPage />} />
          <Route path="/taxi" element={<TaxiPage />} />
          <Route path="/rental" element={<RentalPage />} />
          <Route path="/OptFlight" element={<FlightOpt />} />
          <Route path='*' element={ <Navigate to='/' /> } />
          
        </Routes>
      }
      </Router>
  );
}

export default App;
