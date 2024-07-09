import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../graphql/mutations';

const SignUpPage = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [signUp, { error }] = useMutation(SIGNUP_USER);

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
      const { data } = await signUp({
        variables: { ...formState },
      });
      // Handle successful sign up (e.g., save token, redirect)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="main">
      <div className="login-form" id="main">
        <h2 className="login-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <i className="fa-solid fa-user"></i>
            <input type="text" name="username" placeholder="Username" value={formState.username} onChange={handleChange} required />
          </div>
          <div className="input-field">
            <i className="fa-solid fa-key"></i>
            <input type="password" name="password" placeholder="Password" value={formState.password} onChange={handleChange} required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        {error && <div>Error signing up</div>}
        <label>Already a member?</label>
        <a href="/login" id="login_link">Login instead</a>
      </div>
    </div>
  );
};

export default SignUpPage;
