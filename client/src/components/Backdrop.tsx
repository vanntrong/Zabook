import React, { FC } from 'react';

import './backdrop.scss';

interface BackdropProps {
  color?: string;
  opacity?: number;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Backdrop: FC<BackdropProps> = ({ color = '#000', opacity = 0.2, isShow, setIsShow }) => {
  return (
    <>
      {isShow && (
        <div
          className="backdrop"
          style={{ backgroundColor: color, opacity: opacity }}
          onClick={() => setIsShow(false)}
        ></div>
      )}
    </>
  );
};

export default Backdrop;
