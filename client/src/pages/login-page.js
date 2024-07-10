// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setLoggedIn }) => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      localStorage.setItem('id_token', data.login.token);
      setLoggedIn(true);
      alert('Login successful!');
      navigate('/search');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          value={formState.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>Login failed</p>}
    </div>
  );
};

export default LoginPage;
