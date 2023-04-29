import { MouseEventHandler } from "react";

interface ButtonProps {
  children: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
const Icon: React.FC<ButtonProps> = ({children, onClick = () => {} }) => {
  return (
    <div className="icon" onClick={onClick}>
      {children}
    </div>
  );
};

export default Icon;
