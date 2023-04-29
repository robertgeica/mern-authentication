import { Link } from 'react-router-dom';

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  round?: boolean;
  hasUpload?: boolean;
  onUpload?: Function;
}
const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  round,
  hasUpload,
  onUpload,
}) => {
  const onUploadClick = () => {
    if (!hasUpload) return;

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.addEventListener('change', (event: any) => {
      const files = event.target.files;
      onUpload && onUpload(files);
    });
    fileInput.click();
  };

  return (
    <div
      className={`${hasUpload ? 'overlay-container' : ''}`}
      onClick={onUploadClick}
    >
      <img
        src={src}
        alt={alt}
        className={`${hasUpload ? 'image' : ''} ${round && 'round'}`}
        width={width}
        height={height}
        loading='lazy'
      />
      {hasUpload && (
        <div className={`overlay ${round && 'round'}`}>
          <span className='overlay-icon material-symbols-outlined'>upload_file</span>
        </div>
      )}
    </div>
  );
};

export default Image;
