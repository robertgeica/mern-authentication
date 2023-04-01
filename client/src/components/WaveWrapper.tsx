import { useAuth } from "../contexts/AuthContext";

interface WaveWrapperProps {
  children: any;
}
const WaveWrapper: React.FC<WaveWrapperProps> = ({ children }) => {
  const { authToken } = useAuth();
  return (
    <div className={authToken ? 'wave' : 'wave-wrapper'}>
      {children}
    </div>
  );
};

export default WaveWrapper;
