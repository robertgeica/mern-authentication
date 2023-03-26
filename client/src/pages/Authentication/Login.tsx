import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Loader, TextLink } from '../../components';
import { useAuth } from '../../contexts/AuthContext';

const env = import.meta.env;

interface LoginUser {
  email: string;
  password: string;
}

const Login = () => {
  const { authToken, setAuthToken } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });

  if (authToken) {
    navigate('/');
  }

  const onChange = (event: any) => {
    setUser({ ...user, [event.target.type]: event.target.value });
  };

  function loginUser(values: LoginUser): Promise<any> {
    return axios.post(`${env.VITE_SERVER_BASE_URL}/api/v1/users/login`, values);
  }

  const { isLoading: isLoadingLoginUser, mutate: login } = useMutation(
    loginUser,
    {
      onSuccess: (res: any) => {
        setAuthToken(res.data.authToken);

        // show ok notification

        navigate('/');
      },
      onError: (err: any) => {
        // show error notification
        console.log('error', err);
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
          description='Email address'
          value={user.email}
          onChange={(event) => onChange(event)}
          required
        />

        <Input
          label='Password'
          type='password'
          description='Password'
          value={user.password}
          onChange={(event) => onChange(event)}
          required
        />

        <div className='forgot-password'>
          <TextLink to='/forgot-password' text='Forgot your password?' />
        </div>

        <Button type='submit'>Log in</Button>
      </form>
    </div>
  );
};

export default Login;
