// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/homePage.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
      <div className="overlay">
        <div className="home-content">
          <h1>Your world is worth sharing</h1>
          <p>Find your flight and explore the world with us. We will take care of the rest.</p>
          <button onClick={() => navigate('/learnMore')}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
