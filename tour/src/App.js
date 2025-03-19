// src/App.js
import HomePage from './HomePage';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Explore from './Explore'; // Create these components
import Flights from './Flights';
import Hotels from './Hotels';
import Trains from './Trains';
import Taxis from './Taxis';
import Rentals from './Rentals';
import YatraSignup from './YatraSignup';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/trains" element={<Trains />} />
        <Route path="/taxis" element={<Taxis />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/signup" element={<YatraSignup />} />
      </Routes>
    </Router>
  );
}

export default App;