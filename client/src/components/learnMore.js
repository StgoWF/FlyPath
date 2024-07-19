// src/components/ButtonLink.js
import React from 'react';
import { useNavigate } from 'react-router-dom';


const ButtonLink = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/target-route');
  };

  return (
    <div>
      <h1>Welcome to My Page</h1>
      <p>This is a basic HTML structure in a React component.</p>
      <button onClick={() => alert('Button clicked!')}>Click Me</button>
    </div>
  );
};

export default ButtonLink;
