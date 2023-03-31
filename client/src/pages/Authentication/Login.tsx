import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Loader, TextLink } from '../../components';
import { GENERIC_ERROR_MESSAGE } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';
import { displayNotification } from '../../utils/displayNotification';

const env = import.meta.env;

interface LoginUser {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { authToken, setAuthToken } = useAuth();
  const [user, setUser] = useState({ email: '', password: '' });

  if (authToken) {
    navigate('/');
  }

  const onChange = (event: any) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  };

  function loginUser(values: LoginUser): Promise<any> {
    return axios.post(
      `${env.VITE_SERVER_BASE_URL}/${env.VITE_API_BASE_URL}/users/login`,
      values
    );
  }

  const { isLoading: isLoadingLoginUser, mutate: login } = useMutation(
    loginUser,
    {
      onSuccess: (res: any) => {
        setAuthToken(res.data.authToken);
        navigate('/');
      },
      onError: (err: any) => {
        displayNotification('error', GENERIC_ERROR_MESSAGE);
      },
    }
  );

  if (isLoadingLoginUser) {
    return <Loader />;
  }

  return (
    <div className='auth-screen'>
      <h1 className='auth-title'>👋 Welcome traveler!</h1>
      <p className='auth-description'>
        Login to your account or{' '}
        <TextLink to='/register' text='create a new account' />
      </p>

      <form onSubmit={() => login(user)}>
        <Input
          label='Email address'
          type='email'
          id='email'
          value={user.email}
          onChange={(event) => onChange(event)}
          disabled={isLoadingLoginUser}
          required
        />

        <Input
          label='Password'
          type='password'
          id='password'
          value={user.password}
          onChange={(event) => onChange(event)}
          disabled={isLoadingLoginUser}
          required
        />

        <div className='auth-link-container'>
          <TextLink to='/forgot-password' text='Forgot your password?' />
        </div>

        <Button type='submit'>Log in</Button>
      </form>
    </div>
  );
};

export default Login;
