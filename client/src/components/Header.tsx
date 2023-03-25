import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
      <div className='header-nav'>
        <div className='logo'>
          <img
            src='https://picsum.photos/200'
            alt='Logo'
            className='logo-img'
            width={50}
            height={50}
          />
        </div>

        <nav className='nav'>
          <ul className='nav-links'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/'>About</Link>
            </li>
            <li>
              <Link to='/'>Services</Link>
            </li>
            <li>
              <Link to='/'>Blog</Link>
            </li>
            <li>
              <Link to='/'>Contact</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className='auth-buttons'>
        <Link to='/login' className='auth-button login-button'>Login</Link>
        <Link to='/register' className='auth-button'>Register</Link>
      </div>
    </header>
  );
};

export default Header;
