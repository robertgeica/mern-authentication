import { Link } from 'react-router-dom';
import { NavLink, Image } from '.';

const Header = () => {
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
            <NavLink to='/' text='About' />
            <NavLink to='/' text='Services' />
            <NavLink to='/' text='Blog' />
            <NavLink to='/' text='Contact' />
          </ul>
        </nav>
      </div>

      <div className='auth-buttons'>
        <Link to='/login' className='auth-button login-button'>
          Login
        </Link>
        <Link to='/register' className='auth-button'>
          Register
        </Link>
      </div>
    </header>
  );
};

export default Header;
