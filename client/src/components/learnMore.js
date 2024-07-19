import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ButtonLink.module.css';

const ButtonLink = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/learnMore');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Welcome to My Page</h1>
      <p className={styles.paragraph}>This is a basic HTML structure in a React component.</p>
      <button onClick={() => alert('Button clicked!')}>Click Me</button>    </div>
  );
};

export default ButtonLink;
