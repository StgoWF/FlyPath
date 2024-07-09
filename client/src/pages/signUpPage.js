// src/pages/SignUpPage.js
import React from 'react';

const SignUpPage = () => {
  return (
    <div className="main">
      <div className="login-form" id="main">
        <h2 className="login-title">Sign Up</h2>
        <form method="POST" action="/signup">
          <div className="input-field">
            <i className="fa-solid fa-user"></i>
            <input type="text" name="username" placeholder="Username" required />
          </div>
          <div className="input-field">
            <i className="fa-solid fa-key"></i>
            <input type="password" name="password" placeholder="Password" required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <label>Already a member?</label>
        <a href="/login" id="login_link">Login instead</a>
      </div>
    </div>
  );
};

export default SignUpPage;
