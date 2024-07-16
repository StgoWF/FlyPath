// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <p>&copy; 2024 FlyPath. All Rights Reserved.</p>
      <p>
        <Link to="/privacy-policy">Privacy Policy</Link> |
        <Link to="/terms-of-service">Terms of Service</Link> |
        <Link to="/contact">Contact Us</Link>
      </p>
    </footer>
  );
};

export default Footer;
