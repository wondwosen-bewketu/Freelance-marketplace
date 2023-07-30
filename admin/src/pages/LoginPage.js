import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // import CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // state to store error message
  const [isLoading, setIsLoading] = useState(false); // add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // set loading state to true

    try {
      const response = await axios.post('http://localhost:4000/api/adminlogin', {
        email,
        password
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate('/dashboard');
      
    } catch (error) {
        console.error(error);
        setError('Invalid email or password'); // set error message
    }

    setIsLoading(false); // set loading state to false
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>} {/* display error message if it exists */}
      <form onSubmit={handleSubmit} className='loginform'>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='logininput'
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='logininput'
          />
        </div>
       
        <button type="submit" disabled={isLoading} className="loginbutton">
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
