import { ChangeEventHandler } from 'react';

interface InputProps {
  label?: string;
  type:
    | 'button'
    | 'checkbox'
    | 'date'
    | 'email'
    | 'image'
    | 'number'
    | 'password'
    | 'text'
    | 'tel';
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  alignment?: 'row' | 'column';
  size?: 'auto' | 'sm' | 'md' | 'lg';
  required?: boolean;
  disabled?: boolean;
  children?: any;
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
  disabled,
  children,
}) => {
  return (
    <div className={`input-group-${alignment}`}>
      <label className='input-label' htmlFor={id}>
        {label}
      </label>
      <div>
        {children && children}
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
    </div>
  );
};

export default Input;
