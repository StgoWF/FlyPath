// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ loggedIn }) => {
  return (
    <header>
      <h1>FlyPath</h1>
      <nav>
        <ul className="nav_links">
          <li><Link to="/">Home</Link></li>
          {loggedIn ? (
            <>
              <li><Link to="/saved-flights">Saved Flights</Link></li>
              <li><Link to="/logout">Logout</Link></li>
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
