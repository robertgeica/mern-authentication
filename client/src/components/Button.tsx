interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  children: string;
  variant?: string;
}
const Button: React.FC<ButtonProps> = ({ type, children, variant }) => {
  return (
    <button type={type} className={`button ${variant}`}>
      {children}
    </button>
  );
};

export default Button;
