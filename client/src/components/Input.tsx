import { ChangeEventHandler } from 'react';
import { Link } from 'react-router-dom';

interface InputProps {
  label: string;
  type: 'button' | 'checkbox' | 'date' | 'email' | 'image' | 'number' | 'password' | 'text';
  description: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}
const Input: React.FC<InputProps> = ({
  label,
  type,
  description,
  value,
  onChange,
  required,
}) => {
  return (
    <div className='input-group'>
      <label className='input-label' htmlFor={description}>
        {label}
      </label>
      <input
        className='input'
        type={type}
        id={description}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
