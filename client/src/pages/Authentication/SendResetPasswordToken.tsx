import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Loader, TextLink } from '../../components';
import {
  GENERIC_ERROR_MESSAGE,
  SEND_CONFIRM_EMAIL_MESSAGE,
} from '../../constants';
import { useAuth } from '../../contexts/AuthContext';
import { displayNotification } from '../../utils/displayNotification';

const env = import.meta.env;

const SendConfirmEmailToken = () => {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [email, setEmail] = useState('');

  if (authToken) {
    navigate('/');
  }

  const onChange = (event: any) => {
    setEmail(event.target.value);
  };

  function sendToken(email: string): Promise<any> {
    return axios.post(
      `${env.VITE_SERVER_BASE_URL}/${env.VITE_API_BASE_URL}/users/reset-password`,
      { email }
    );
  }

  const {
    isLoading: isLoadingResetPasswordToken,
    mutate: sendTokenViaEmail,
  } = useMutation(sendToken, {
    onSuccess: (res: any) => {
      displayNotification('success', SEND_CONFIRM_EMAIL_MESSAGE);
      navigate('/reset-password');
    },
    onError: (err: any) => {
      displayNotification('error', GENERIC_ERROR_MESSAGE);
    },
  });

  if (isLoadingResetPasswordToken) {
    return <Loader />;
  }

  return (
    <div className='auth-screen'>
      <h1 className='auth-title'>You're about to reset your password</h1>
      <p className='auth-description'>Check your email to finish the process</p>

      <form onSubmit={() => sendTokenViaEmail(email)}>
        <Input
          label='Email adress'
          type='email'
          id='email'
          value={email}
          onChange={(event) => onChange(event)}
          required
        />

        <div className='auth-link-container'>
          <TextLink to='/reset-password' text='I have a reset password key!' />
        </div>

        <Button type='submit'>Reset password</Button>
      </form>
    </div>
  );
};

export default SendConfirmEmailToken;
