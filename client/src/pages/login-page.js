// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { username, password } });
      localStorage.setItem('id_token', data.login.token);
      window.location.assign('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main">
      <div className="login-form" id="main">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <i className="fa-solid fa-user"></i>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <i className="fa-solid fa-key"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p>Error logging in</p>}
        <label>Not a member?</label>
        <a href="/signup" id="signup_link">Sign up instead</a>
      </div>
    </div>
  );
};

export default LoginPage;
