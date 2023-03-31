import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, Loader, TextLink } from '../../components';
import { CONFIRM_EMAIL_MESSAGE, GENERIC_ERROR_MESSAGE } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';
import { displayNotification } from '../../utils/displayNotification';

const env = import.meta.env;

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { authToken, setAuthToken } = useAuth();
  const [confirmationToken, setConfirmationToken] = useState(params.id || '');

  if (authToken) {
    navigate('/');
  }

  const onChange = (event: any) => {
    setConfirmationToken(event.target.value);
  };

  function confirmEmail(): Promise<any> {
    return axios.put(
      `${env.VITE_SERVER_BASE_URL}/${env.VITE_API_BASE_URL}/users/confirm-email/${confirmationToken}`
    );
  }

  const { isLoading: isLoadingConfirmEmail, mutate: confirm } = useMutation(
    confirmEmail,
    {
      onSuccess: (res: any) => {
        displayNotification('success', CONFIRM_EMAIL_MESSAGE);
        setAuthToken(res.data.token);
        navigate('/');
      },
      onError: (err: any) => {
        displayNotification('error', GENERIC_ERROR_MESSAGE);
      },
    }
  );

  if (isLoadingConfirmEmail) {
    return <Loader />;
  }

  return (
    <div className='auth-screen'>
      <h1 className='auth-title'>You're almost done!</h1>
      <p className='auth-description'>
        Confirm your token and you're ready to go!
      </p>

      <form onSubmit={() => confirm()}>
        <Input
          label='Token'
          type='text'
          id='token'
          value={confirmationToken}
          onChange={(event) => onChange(event)}
          required
        />

        <div className='auth-link-container'>
          <TextLink
            to='/send-confirm-email-token'
            text='Send token again'
          />
        </div>

        <Button type='submit'>Confirm email</Button>
      </form>
    </div>
  );
};

export default ConfirmEmail;
