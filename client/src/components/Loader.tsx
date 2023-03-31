interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
}

enum SIZES {
  sm = 14,
  md = 24,
  lg = 30,
}

const Loader: React.FC<LoaderProps> = ({ size }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <span
        className='loader'
        style={{
          width: `${SIZES[size || 'sm']}px`,
          height: `${SIZES[size || 'sm']}px`,
        }}
      ></span>
    </div>
  );
};

export default Loader;
