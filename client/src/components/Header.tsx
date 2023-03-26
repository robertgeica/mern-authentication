import { NavLink, Image, ButtonGroup, ButtonLink, Button } from '.';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { authToken, setAuthToken } = useAuth();

  const handleLogout = () => {
    setAuthToken(null);
  };

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
            <NavLink to='/' text='Protected' />
            <NavLink to='/' text='Admin' />
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
