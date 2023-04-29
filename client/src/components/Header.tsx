import axios from 'axios';
import { useQuery } from 'react-query';
import { NavLink, Image, ButtonGroup, ButtonLink, Button, Loader } from '.';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const env = import.meta.env;

const Header = () => {
  const { authToken, setAuthToken } = useAuth();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setAuthToken(null);
  };

  const {
    data: user,
    isLoading: isUserLoading,
    error: onUserLoadError,
  } = useQuery(
    ['logged-user', authToken],
    async () => {
      const res = await axios.get(
        `${env.VITE_SERVER_BASE_URL}/${env.VITE_API_BASE_URL}/users/logged-user`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setUser(res.data.user);
      return res.data.user;
    },
    { enabled: authToken !== null }
  );

  useEffect(() => {
    if (!authToken) {
      navigate('/');
      setAuthToken(null);
    }
  }, [authToken]);

  if (onUserLoadError) {
    localStorage.removeItem('auth-token');
  }

  return (
    <header className='header'>
      <div className='header-container'>
        <div className='logo'>
          <Image
            src='https://picsum.photos/200'
            alt='Logo'
            width={50}
            height={50}
            round
          />
        </div>

        <nav className='nav'>
          <ul className='nav-links'>
            <NavLink to='/' text='Home' />
            <NavLink to='/' text='Public' />
            {user && <NavLink to='/user' text='Profile' />}
            {user?.role === 'admin' && <NavLink to='/' text='Admin' />}
          </ul>
        </nav>
      </div>

      <ButtonGroup>
        {authToken ? (
          <Button type='submit' variant='outlined' onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <ButtonLink to='/login' text='Login' variant='outlined' />
            <ButtonLink to='/register' text='Register' />
          </>
        )}
      </ButtonGroup>
    </header>
  );
};

export default Header;
