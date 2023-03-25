import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

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
      <h1 className='login-title'>Create an account</h1>
      <p className='login-description'>
      Do you already have an account?{' '}
        <Link to='/login'>Click here to log in</Link>
      </p>

      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label className='input-label' htmlFor='name'>
            Name
          </label>
          <input
            className='input'
            type='name'
            id='name'
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

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

        <button className="button" type='submit'>Get started</button>
      </form>
    </div>
  );
};

export default Register;
