import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import InputGamesPage from './Pages/InputGamesPage';
import HomePage from './Pages/HomePage';
import Navbar from './Components/NavBar';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <div>


    <Router>

      <Routes>


        {/*Public Routes */}

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />


        {/*Private Routes */}
        <Route path="/" element={ <PrivateRoute />} >
          <Route path="/home" element={<HomePage />} />
          <Route path="/input" element={<InputGamesPage />} />
        </Route>
      </Routes>

    </Router>

    </div>
  );
  
}

export default App
