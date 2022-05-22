import React, { FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import './popup.scss';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'comment' | 'post' | 'friend' | 'story';
}

const PopUp: FC<PopUpProps> = ({ isOpen, onClose, onConfirm, type }) => {
  const isDarkMode = useAppSelector(selectTheme);
  return (
    <>
      {isOpen ? (
        <div className={`pop-up ${isDarkMode ? 'dark' : ''}`}>
          <div className="pop-up-top">
            <h2>Delete {type}?</h2>
            <div className="pop-up-top-close" onClick={onClose}>
              <AiOutlineClose />
            </div>
          </div>
          <hr />
          <p className="pop-up-content">
            Are you sure you want to delete this {type}? This action cannot be undone.
          </p>
          <div className="pop-up-button">
            <button className="pop-up-button-cancel" onClick={onClose}>
              No
            </button>
            <button className="pop-up-button-confirm" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PopUp;
