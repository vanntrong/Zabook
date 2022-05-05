import CloudIcon from '@mui/icons-material/Cloud';
import React, { FC } from 'react';
import './dragImage.scss';
import { Player } from 'react-tuby';
import 'react-tuby/css/main.css';

interface DragImageProps {
  changFilesHandler: (files: any[]) => void;
  filesPreview: any[];
}

const DragImage: FC<DragImageProps> = ({ changFilesHandler, filesPreview }) => {
  const [onDrag, setOnDrag] = React.useState<boolean>(false);
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setOnDrag(true);
    document.querySelector('.drag-area')?.classList.add('active');
  };

  const handleDragLeave = () => {
    setOnDrag(false);
    document.querySelector('.drag-area')?.classList.remove('active');
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setOnDrag(false);
    document.querySelector('.drag-area')?.classList.remove('active');
    const files = e.dataTransfer.files;
    if (files) {
      changFilesHandler(files);
    }
  };

  const handleButtonClick = () => {
    document.querySelector('.drag-area')?.classList.remove('active');
    const inputElement: HTMLInputElement = document.querySelector(
      ".drag-area input[type='file']"
    ) as HTMLInputElement;
    inputElement.click();
  };

  const handleInputChange = (e: any) => {
    const files = e.target.files;
    if (files) {
      changFilesHandler(files);
    }
  };

  return (
    <div
      className="drag-area"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {filesPreview &&
        filesPreview.length > 0 &&
        (filesPreview[0].media_type === 'image' ? (
          <img src={filesPreview[0].url} alt="" />
        ) : (
          <Player
            src={filesPreview[0].url}
            dimensions={{ width: '100%', height: '100%' }}
            keyboardShortcut={false}
          >
            {(ref, props) => <video ref={ref} {...props} autoPlay />}
          </Player>
        ))}
      {filesPreview && filesPreview.length > 1 && (
        <span className="img-count-more">+ {filesPreview.length - 1}</span>
      )}

      <div className="drag-icon">
        <CloudIcon sx={{ width: 100, height: 100 }} htmlColor="#be185d" />
      </div>
      <div className="drag-text">{onDrag ? 'Drop file here' : 'Drag Or Drop File to Upload'}</div>
      <span>OR</span>
      <button type="button" onClick={handleButtonClick}>
        Browse File
      </button>
      <input type="file" hidden multiple onChange={handleInputChange} />
    </div>
  );
};

export default DragImage;
