import { ChangeEventHandler } from 'react';

interface InputProps {
  label: string;
  type: 'button' | 'checkbox' | 'date' | 'email' | 'image' | 'number' | 'password' | 'text';
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  disabled?: boolean;
}
const Input: React.FC<InputProps> = ({
  label,
  type,
  id,
  value,
  onChange,
  required,
  disabled
}) => {
  return (
    <div className='input-group'>
      <label className='input-label' htmlFor={id}>
        {label}
      </label>
      <input
        className='input'
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
