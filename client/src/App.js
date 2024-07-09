// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import SavedFlightsPage from './pages/SavedFlightsPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Header loggedIn={false} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/saved-flights" component={SavedFlightsPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
