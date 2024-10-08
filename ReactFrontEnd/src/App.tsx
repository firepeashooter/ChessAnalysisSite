import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import InputGamesPage from './Pages/InputGamesPage';
import Navbar from './Components/NavBar';


function App() {
  return (
    <div>

    <Navbar/>

    <Router>

      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/input" element={<InputGamesPage />} />

      </Routes>

    </Router>

    </div>
  );
  
}

export default App
