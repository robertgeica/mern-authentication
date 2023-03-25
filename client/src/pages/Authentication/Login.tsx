import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, TextLink } from '../../components';

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
    <div className='auth-screen'>
      <h1 className='auth-title'>👋 Welcome traveler!</h1>
      <p className='auth-description'>
        Login to your account or{' '}
        <TextLink to='/register' text='create a new account' />
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          label='Email address'
          type='email'
          description='Email address'
          value={email}
          onChange={handleEmailChange}
          required
        />

        <Input
          label='Password'
          type='password'
          description='Password'
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <div className='forgot-password'>
          <TextLink to='/forgot-password' text='Forgot your password?' />
        </div>

        <button className='button' type='submit'>
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
