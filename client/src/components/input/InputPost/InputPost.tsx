import Avatar from '@mui/material/Avatar';
import Backdrop from 'components/Backdrop';
import Notification from 'components/Notification';
import 'emoji-mart/css/emoji-mart.css';
import React, { FC, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import './inputpost.scss';
import InputPostModal from './inputPostModal/InputPostModal';

interface InputPostProps {
  className?: string;
}

const InputPost: FC<InputPostProps> = ({ className }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isShowPostModal, setIsShowPostModal] = useState<boolean>(false);
  const [isSubmitForm, setIsSubmitForm] = useState<boolean>(false);

  return (
    <>
      <div className={`form-post ${className ? className : ''}`}>
        <div className="form-post__group">
          <div className="user-image">
            <Avatar src={currentUser?.avatar} alt="" />
          </div>
          <div className="form-post__input" onClick={() => setIsShowPostModal(true)}>
            {`What's on your mind, ${currentUser?.lastName}? `}
          </div>
        </div>
        <hr />
        <div className="form-input__image">
          <div className="form-input-activity">
            <img src="/assets/images/photo.png" alt="" className="form-post__icon" />
            <span>Photos/Videos</span>
          </div>
          <div className="form-input-activity">
            <img src="/assets/images/tag.png" alt="" className="form-post__icon" />
            <span>Tags</span>
          </div>
          <div className="form-input-activity">
            <img src="/assets/images/feeling.png" alt="" className="form-post__icon" />
            <span>Feeling/Activity</span>
          </div>
        </div>
      </div>
      {isShowPostModal && (
        <InputPostModal
          currentUser={currentUser}
          onSubmit={setIsSubmitForm}
          setIsShowPostModal={setIsShowPostModal}
        />
      )}
      {isSubmitForm && <Notification type="success" content="Your post is being on process..." />}
      <Backdrop isShow={isShowPostModal} setIsShow={setIsShowPostModal} color="#fff" />
    </>
  );
};

export default InputPost;
