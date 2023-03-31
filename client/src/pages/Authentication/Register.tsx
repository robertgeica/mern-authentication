import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Loader, TextLink } from '../../components';
import {
  ACCOUNT_CREATED_MESSAGE,
  CONFIRM_EMAIL_MESSAGE,
  GENERIC_ERROR_MESSAGE,
} from '../../constants';
import { useAuth } from '../../contexts/AuthContext';
import { displayNotification } from '../../utils/displayNotification';

const env = import.meta.env;

interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  if (authToken) {
    navigate('/');
  }

  const onChange = (event: any) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  };

  function registerUser(values: RegisterUser): Promise<any> {
    return axios.post(
      `${env.VITE_SERVER_BASE_URL}/${env.VITE_API_BASE_URL}/users`,
      values
    );
  }

  const {
    isLoading: isLoadingRegisterUser,
    isSuccess: isRegisterUserSuccess,
    mutate: register,
  } = useMutation(registerUser, {
    onSuccess: (res: any) => {
      navigate('/'); // this should become email confirmation route
      displayNotification('success', ACCOUNT_CREATED_MESSAGE);
      displayNotification('info', CONFIRM_EMAIL_MESSAGE);
    },
    onError: (err: any) => {
      displayNotification('error', GENERIC_ERROR_MESSAGE);
    },
  });

  if (isLoadingRegisterUser) {
    return <Loader />;
  }

  return (
    <div className='auth-screen'>
      <h1 className='auth-title'>Create an account</h1>
      <p className='auth-description'>
        Do you already have an account?{' '}
        <TextLink to='/login' text='Click here to log in' />
      </p>

      <form onSubmit={() => register(user)}>
        <Input
          label='Name'
          type='text'
          id='name'
          value={user.name}
          onChange={(event) => onChange(event)}
          disabled={isLoadingRegisterUser}
          required
        />

        <Input
          label='Email address'
          type='email'
          id='email'
          value={user.email}
          onChange={(event) => onChange(event)}
          disabled={isLoadingRegisterUser}
          required
        />

        <Input
          label='Password'
          type='password'
          id='password'
          value={user.password}
          onChange={(event) => onChange(event)}
          disabled={isLoadingRegisterUser}
          required
        />

        <Button type='submit'>Get started</Button>
      </form>
    </div>
  );
};

export default Register;
