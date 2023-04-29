import { useState } from 'react';
import {
  PageContainer,
  Image,
  Input,
  Loader,
  Button,
  Icon,
} from '../components';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { displayNotification } from '../utils/displayNotification';
import { CONFIRM_UPDATE_ACCOUNT, GENERIC_ERROR_MESSAGE } from '../constants';
const env = import.meta.env;

const User = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [newUser, setNewUser] = useState<{ name?: string }>({});
  const [newEmail, setNewEmail] = useState<string | null>();
  const [emailToken, setEmailToken] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();
  const [passwordToken, setPasswordToken] = useState<string | null>();

  const { isLoading: isLoadingUpdateUser, mutate: updateUser } = useMutation(
    (values: any) =>
      axios.patch(
        `${env.VITE_SERVER_BASE_URL}/${env.VITE_API_BASE_URL}/users/${user._id}`,
        values
      ),
    {
      onSuccess: (res: any) => {
        displayNotification('success', CONFIRM_UPDATE_ACCOUNT);
        setNewUser({});
        queryClient.invalidateQueries({ queryKey: ['logged-user'] });
      },
      onError: (err: any) => {
        displayNotification('error', GENERIC_ERROR_MESSAGE);
      },
    }
  );

  const { isLoading: isLoadingUpdateEmail, mutate: updateEmail } = useMutation(
    (email: any) =>
      axios.post(
        `${env.VITE_SERVER_BASE_URL}/${env.VITE_API_BASE_URL}/users/change-email`,
        { newEmail: email }
      ),
    {
      onSuccess: (res: any) => {
        displayNotification('success', CONFIRM_UPDATE_ACCOUNT);
        setNewEmail(null);
        queryClient.invalidateQueries({ queryKey: ['logged-user'] });
      },
      onError: (err: any) => {
        displayNotification('error', GENERIC_ERROR_MESSAGE);
      },
    }
  );

  const { isLoading: isLoadingConfirmEmailToken, mutate: confirmEmailToken } =
    useMutation(
      (token: any) =>
        axios.post(
          `${env.VITE_SERVER_BASE_URL}/${env.VITE_API_BASE_URL}/users/change-email/${token}`
        ),
      {
        onSuccess: (res: any) => {
          displayNotification('success', CONFIRM_UPDATE_ACCOUNT);
          setNewEmail(null);
          queryClient.invalidateQueries({ queryKey: ['logged-user'] });
        },
        onError: (err: any) => {
          displayNotification('error', GENERIC_ERROR_MESSAGE);
        },
      }
    );

  const { isLoading: isLoadingChangePassword, mutate: changePassword } =
    useMutation(
      (email: any) =>
        axios.post(
          `${env.VITE_SERVER_BASE_URL}/${env.VITE_API_BASE_URL}/users/reset-password`,
          { email: email }
        ),
      {
        onSuccess: (res: any) => {
          displayNotification('success', CONFIRM_UPDATE_ACCOUNT);
          setNewEmail(null);
          queryClient.invalidateQueries({ queryKey: ['logged-user'] });
        },
        onError: (err: any) => {
          displayNotification('error', GENERIC_ERROR_MESSAGE);
        },
      }
    );

  const { isLoading: isLoadingConfirmPassword, mutate: confirmPassword } =
    useMutation(
      (password: any) =>
        axios.put(
          `${env.VITE_SERVER_BASE_URL}/${env.VITE_API_BASE_URL}/users/reset-password/${passwordToken}`,
          { password: password }
        ),
      {
        onSuccess: (res: any) => {
          displayNotification('success', CONFIRM_UPDATE_ACCOUNT);
          setNewEmail(null);
          queryClient.invalidateQueries({ queryKey: ['logged-user'] });
        },
        onError: (err: any) => {
          displayNotification('error', GENERIC_ERROR_MESSAGE);
        },
      }
    );
  const { isLoading: isLoadingImageUpload, mutate: uploadImage } = useMutation(
    (files: any): any => {
      const formData = new FormData();
      formData.append('files', files[0]);
      formData.append('usage', 'avatar');
      axios.patch(
        `${env.VITE_SERVER_BASE_URL}/${env.VITE_API_BASE_URL}/users/image-upload`,
        formData
      );
    },
    {
      onSuccess: (res: any) => {
        displayNotification('success', CONFIRM_UPDATE_ACCOUNT);
        queryClient.invalidateQueries({ queryKey: ['logged-user'] });
      },
      onError: (err: any) => {
        displayNotification('error', GENERIC_ERROR_MESSAGE);
      },
    }
  );

  if (
    !user ||
    isLoadingUpdateUser ||
    isLoadingUpdateEmail ||
    isLoadingConfirmEmailToken ||
    isLoadingChangePassword ||
    isLoadingConfirmPassword ||
    isLoadingImageUpload
  ) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <div
        className='user-section'
        style={{ display: 'flex', margin: '2em 0' }}
      >
        <Image
          src={`${env.VITE_SERVER_BASE_URL}/uploads/${user.avatar.url}`}
          alt='Logo'
          width={100}
          height={100}
          round
          hasUpload
          onUpload={uploadImage}
        />
        <div style={{ margin: '1.5em' }}>
          <h2 style={{ display: 'flex', marginBottom: '.5em' }}>
            Hello, {user.name}!
          </h2>
          <p style={{ textAlign: 'start', marginTop: 0 }}>
            Update your profile picture and personal details.
          </p>
        </div>
      </div>

      <div className='user-section'>
        <Input
          label='Name'
          type='text'
          id='name'
          value={newUser.name || user.name}
          onChange={(event) =>
            setNewUser((prevState) => ({
              ...prevState,
              name: event.target.value,
            }))
          }
          alignment='row'
          size='lg'
          required
        />
        {newUser.name && (
          <Icon onClick={() => updateUser(newUser)}>&#x2714;</Icon>
        )}
      </div>

      <div className='user-section'>
        <Input
          label='Email'
          type='text'
          id='email'
          value={newEmail || user.email}
          onChange={(event) => setNewEmail(event.target.value)}
          alignment='row'
          size='lg'
          required
        />
        {newEmail && (
          <Icon onClick={() => updateEmail(newEmail)}>&#x2714;</Icon>
        )}
      </div>
      {/* check if token is expired */}
      {(new Date() > new Date(user.changeEmailStepOneExpire) ||
        new Date() > new Date(user.changeEmailStepTwoExpire)) && (
        <p className='info error-info'>
          Your token has expired. Please change your email again!
        </p>
      )}
      {/* show message */}
      {user.newEmail &&
        (user.changeEmailStepOneToken || user.changeEmailStepTwoToken) && (
          <>
            <p className='info warning-info'>
              Check your {user.changeEmailStepOneToken ? 'current' : 'new'}{' '}
              account's email address inbox for the confirmation token.
              <br /> Add it below or access the link in your email.
            </p>
            <div className='user-section'>
              <Input
                label='Email token'
                type='text'
                id='email-token'
                value={emailToken || ''}
                onChange={(event) => setEmailToken(event.target.value)}
                alignment='row'
                size='lg'
                required
              />

              {emailToken && (
                <Icon onClick={() => confirmEmailToken(emailToken)}>
                  &#x2714;
                </Icon>
              )}
            </div>
          </>
        )}

      {!user.resetPasswordToken ||
      new Date() > new Date(user.resetPasswordExpire) ? (
        <div className='input-group-row'>
          <p>Password</p>
          <p
            className='info warning-info'
            onClick={() => changePassword(user.email)}
            style={{ cursor: 'pointer' }}
          >
            Click here to request password reset token
          </p>
        </div>
      ) : (
        <>
          <div className='user-section'>
            <Input
              label='Password'
              type='password'
              id='password'
              value={password || ''}
              onChange={(event) => setPassword(event.target.value)}
              alignment='row'
              size='lg'
              required
            />
          </div>
          <div className='user-section'>
            <Input
              label='Passsword token'
              type='text'
              id='password-token'
              value={passwordToken || ''}
              onChange={(event) => setPasswordToken(event.target.value)}
              alignment='row'
              size='lg'
              required
            />
            {password && passwordToken && (
              <Icon onClick={() => confirmPassword(password)}>&#x2714;</Icon>
            )}
          </div>
        </>
      )}
      <div className='user-section'>
        <Input
          label='Role'
          type='text'
          id='role'
          value={user.role}
          onChange={(event) => {}}
          alignment='row'
          size='lg'
          required
          disabled
        />
      </div>
      <div className='user-section'>
        <Input
          label='Phone number'
          type='tel'
          id='number'
          value={user.phoneNumber}
          onChange={(event) => {}}
          alignment='row'
          size='lg'
          required
        />
      </div>
      <div className='user-section' style={{ alignItems: 'flex-end' }}>
        <Button type='button' onClick={() => {}}>
          Delete account
        </Button>
      </div>
    </PageContainer>
  );
};

export default User;
