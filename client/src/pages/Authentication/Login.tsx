import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className='login-screen'>
      <h1 className='login-title'>👋 Welcome traveler!</h1>
      <p className='login-description'>
        Login to your account or{' '}
        <Link to='/register'>create a new account</Link>
      </p>

      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label className='input-label' htmlFor='email'>
            Email address
          </label>
          <input
            className='input'
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className='input-group'>
          <label className='input-label' htmlFor='password'>
            Password
          </label>
          <input
            className='input'
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div className='forgot-password'>
          <Link to='/forgot-password'>Forgot your password?</Link>
        </div>

        <button className="button" type='submit'>Log in</button>
      </form>
    </div>
  );
};

export default Login;
