// src/pages/SignUpPage.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../graphql/mutations';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { error }] = useMutation(SIGNUP_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup({ variables: { username, password } });
      localStorage.setItem('id_token', data.signup.token);
      window.location.assign('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main">
      <div className="login-form" id="main">
        <h2 className="login-title">Sign Up</h2>
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
          <button type="submit">Sign Up</button>
        </form>
        {error && <p>Error signing up</p>}
        <label>Already a member?</label>
        <a href="/login" id="login_link">Login instead</a>
      </div>
    </div>
  );
};

export default SignUpPage;
