import { Link } from 'react-router-dom';

interface ButtonLinkProps {
  to: string;
  text: string;
  variant?: string;
}
const ButtonLink: React.FC<ButtonLinkProps> = ({ to, text, variant }) => {
  return (
    <Link to={to} className={`button ${variant}`} >
      {text}
    </Link>
  );
};

export default ButtonLink;
