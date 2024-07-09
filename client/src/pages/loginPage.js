// src/pages/LoginPage.js
import React from 'react';

const LoginPage = () => {
  return (
    <div className="main">
      <div className="login-form" id="main">
        <h2 className="login-title">Login</h2>
        <form method="POST" action="/login">
          <div className="input-field">
            <i className="fa-solid fa-user"></i>
            <input type="text" name="username" placeholder="Username" required />
          </div>
          <div className="input-field">
            <i className="fa-solid fa-key"></i>
            <input type="password" name="password" placeholder="Password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <label>Not a member?</label>
        <a href="/signup" id="signup_link">Sign up now</a>
      </div>
    </div>
  );
};

export default LoginPage;
