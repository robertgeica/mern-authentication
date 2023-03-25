import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  text: string;
}
const NavLink: React.FC<NavLinkProps> = ({ to, text }) => {
  return (
    <li>
      <Link className='nav-link' to={to}>
        {text}
      </Link>
    </li>
  );
};

export default NavLink;
