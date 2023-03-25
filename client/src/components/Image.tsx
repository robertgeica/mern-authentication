import { Link } from 'react-router-dom';

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  round?: boolean;
}
const Image: React.FC<ImageProps> = ({ src, alt, width, height, round }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`${round && 'round'}`}
      width={width}
      height={height}
      loading="lazy"
    />
  );
};

export default Image;
