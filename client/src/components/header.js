// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ loggedIn, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      handleLogout();
      navigate('/');
    }
  };

  return (
    <header>
      <h1>FlyPath</h1>
      <nav>
        <ul className="nav_links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          {loggedIn ? (
            <>
              <li><Link to="/saved-flights">Saved Flights</Link></li>
              <li><a href="#" onClick={handleLogoutClick}>Logout</a></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
