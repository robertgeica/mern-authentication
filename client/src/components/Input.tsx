import { ChangeEventHandler } from 'react';

interface InputProps {
  label: string;
  type: 'button' | 'checkbox' | 'date' | 'email' | 'image' | 'number' | 'password' | 'text' | 'tel';
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  alignment?: 'row' | 'column';
  size?: 'auto' | 'sm' | 'md' | 'lg';
  required?: boolean;
  disabled?: boolean;
}
const Input: React.FC<InputProps> = ({
  label,
  type,
  id,
  value,
  onChange,
  alignment = 'column',
  size = 'auto',
  required,
  disabled
}) => {
  return (
    <div className={`input-group-${alignment}`}>
      <label className='input-label' htmlFor={id}>
        {label}
      </label>
      <input
        className={`input input-${size}`}
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
