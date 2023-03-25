interface WaveWrapperProps {
  children: any;
}
const WaveWrapper: React.FC<WaveWrapperProps> = ({ children }) => {
  return (
    <div className='wave-wrapper'>
      {children}
    </div>
  );
};

export default WaveWrapper;
