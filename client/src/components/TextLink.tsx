import { Link } from 'react-router-dom';

interface TextLinkProps {
  to: string;
  text: string;
}
const TextLink: React.FC<TextLinkProps> = ({ to, text }) => {
  return (
    <Link to={to} className={`text-link`}>
      {text}
    </Link>
  );
};

export default TextLink;
