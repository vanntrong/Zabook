import React, { FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './popup.scss';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'comment' | 'post' | 'friend';
}

const PopUp: FC<PopUpProps> = ({ isOpen, onClose, onConfirm, type }) => {
  return (
    <>
      {isOpen ? (
        <div className="pop-up">
          <div className="pop-up-top">
            <h2>Delete {type === 'comment' ? 'Comment' : type === 'post' ? 'Post' : 'Friend'}?</h2>
            <div className="pop-up-top-close" onClick={onClose}>
              <AiOutlineClose />
            </div>
          </div>
          <hr />
          <p className="pop-up-content">
            Are you sure you want to delete this{' '}
            {type === 'comment' ? 'Comment' : type === 'post' ? 'Post' : 'Friend'}?
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
