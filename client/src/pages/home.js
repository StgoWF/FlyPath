// src/pages/Home.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchPanel from '../components/SearchPanel';
import Header from '../components/header'; // Import Header
import Footer from '../components/footer'; // Import Footer
import './homePage.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // navigate('/search'); // Commented out to keep the search panel visible
  }, [navigate]);

  return (
    <>
      <Header />
      <main>
        <div className="home-container">
          <div className="background-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
          </div>
          <div className="home-content">
            <p>Find your flight and explore the world with us. We will take care of the rest.</p>
          </div>
          <SearchPanel />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
