interface ButtonGroupProps {
  children: any;
}
const ButtonGroup: React.FC<ButtonGroupProps> = ({ children }) => {
  return (
    <div className='button-group'>
      {children}
    </div>
  );
};

export default ButtonGroup;
