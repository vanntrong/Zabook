import React, { FC, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import './imagePlayer.scss';

interface Props {
  src: string;
  className?: string;
}

const ImagePlayer: FC<Props> = ({ src, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {!isOpen && (
        <div
          className={`imagePlayer ${className ? className : ''}`}
          onClick={() => setIsOpen(true)}
        >
          <img src={src} alt="" />
        </div>
      )}
      {isOpen && (
        <div className="imagePlayer-open">
          <div className="imagePlayer-open-icon" onClick={() => setIsOpen(false)}>
            <AiOutlineClose />
          </div>
          <div className="imagePlayer-open-wrapper">
            <div className="imagePlayer-open-wrapper-img">
              <img src={src} alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePlayer;
