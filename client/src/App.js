// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApolloProvider from './ApolloProvider'; 
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Search from './pages/search';
import SavedFlightsPage from './pages/saved-flights-page';
import SignUpPage from './pages/sign-up-page';
import LoginPage from './pages/login-page';
import PaymentPage from './components/paymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ButtonLink from './components/learnMore';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('id_token');
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('id_token');
    setLoggedIn(false);
  };

  return (
  <Elements stripe={stripePromise}>
    <ApolloProvider>
      <Router>
        <Header loggedIn={loggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/saved-flights" element={<SavedFlightsPage />} />
          <Route path="/signup" element={<SignUpPage setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path='/learnMore' element={<ButtonLink/>} />
        </Routes>
        <Footer />
      </Router>
      
    </ApolloProvider>
    </Elements>
  );
};

export default App;
