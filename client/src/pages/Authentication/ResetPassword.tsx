import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, Loader, TextLink } from '../../components';
import {
  CONFIRM_PASSWORD_MESSAGE,
  GENERIC_ERROR_MESSAGE,
} from '../../constants';
import { useAuth } from '../../contexts/AuthContext';
import { displayNotification } from '../../utils/displayNotification';

const env = import.meta.env;

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { authToken, setAuthToken } = useAuth();
  const [confirmationToken, setConfirmationToken] = useState(params.id || '');
  const [password, setPassword] = useState('');

  if (authToken) {
    navigate('/');
  }

  function changePassword(password: string): Promise<any> {
    return axios.put(
      `${env.VITE_SERVER_BASE_URL}/${env.VITE_API_BASE_URL}/users/reset-password/${confirmationToken}`,
      { password }
    );
  }

  const { isLoading: isLoadingChangePassword, mutate: confirm } = useMutation(
    changePassword,
    {
      onSuccess: (res: any) => {
        displayNotification('success', CONFIRM_PASSWORD_MESSAGE);
        setAuthToken(res.data.token);
      },
      onError: (err: any) => {
        displayNotification('error', GENERIC_ERROR_MESSAGE);
      },
    }
  );

  if (isLoadingChangePassword) {
    return <Loader />;
  }

  return (
    <div className='auth-screen'>
      <h1 className='auth-title'>You're almost done!</h1>
      <p className='auth-description'>
        Enter your token and password and you're ready to go
      </p>

      <form onSubmit={() => confirm(password)}>
        <Input
          label='Token'
          type='text'
          id='token'
          value={confirmationToken}
          onChange={(event) => setConfirmationToken(event.target.value)}
          required
        />

        <Input
          label='password'
          type='password'
          id='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <div className='auth-link-container'>
          <TextLink to='/forgot-password' text='Forgot password?' />
        </div>

        <Button type='submit'>Change password</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
