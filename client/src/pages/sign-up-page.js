import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { SIGNUP_USER } from '../graphql/mutations';
import './SignUpPage.css';

const SignUpPage = () => {
  const [formState, setFormState] = useState({ firstName: '', lastName: '', username: '', password: '' });
  const navigate = useNavigate();
  const [signUp, { error }] = useMutation(SIGNUP_USER, {
    onCompleted: () => {
      alert('Signup successful! Please log in.');
      localStorage.setItem('user', JSON.stringify(formState));
      navigate('/login');
    },
    onError: (error) => {
      alert(`Signup failed: ${error.message}`);
    }
  });

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
      await signUp({ variables: { ...formState } });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="signup-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formState.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formState.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formState.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <label>Already a member?</label>
        <a href="/login" id="login_link">Login instead</a>
        {error && <p>Signup failed</p>}
      </div>
    </div>
  );
};

export default SignUpPage;
