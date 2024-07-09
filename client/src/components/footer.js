// src/components/Footer.js
import React from 'react';

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
