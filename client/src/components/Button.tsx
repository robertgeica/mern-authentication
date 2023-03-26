import { MouseEventHandler } from "react";

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  children: string;
  variant?: 'outlined';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const Button: React.FC<ButtonProps> = ({ type, children, variant, disabled, onClick = () => {} }) => {
  return (
    <button type={type} className={`button ${variant}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
