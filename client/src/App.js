// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Search from './pages/search';
import SavedFlightsPage from './pages/saved-flights-page';
import SignUpPage from './pages/sign-up-page';
import LoginPage from './pages/login-page';

const App = () => {
  return (
    <Router>
      <Header loggedIn={false} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/saved-flights" element={<SavedFlightsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
