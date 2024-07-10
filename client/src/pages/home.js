// src/pages/Home.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/search');
  }, [navigate]);

  return null; // No muestra contenido, redirige directamente a /search
};

export default Home;
