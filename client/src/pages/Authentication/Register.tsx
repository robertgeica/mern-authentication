import { useState } from 'react';
import { Button, Input, TextLink } from '../../components';

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
    console.log(`Email: ${email}, Password: ${password}, Name: ${name}`);
  };

  return (
    <div className='auth-screen'>
      <h1 className='auth-title'>Create an account</h1>
      <p className='auth-description'>
        Do you already have an account?{' '}
        <TextLink to='/login' text='Click here to log in' />
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          label='Name'
          type='text'
          description='name'
          value={name}
          onChange={handleNameChange}
          required
        />

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

        <Button type='submit'>Get started</Button>
      </form>
    </div>
  );
};

export default Register;
