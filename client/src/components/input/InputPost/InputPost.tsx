import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
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
        <div className="user-image">
          <Avatar src={currentUser?.avatar} alt="" />
        </div>
        <div className="form-post__group">
          <div className="form-post__input" onClick={() => setIsShowPostModal(true)}>
            {`What's on your mind, ${currentUser?.lastName}? `}
          </div>
          <div className="form-input__image">
            <ImageOutlinedIcon className="form-post__icon" />
            <PersonOutlineOutlinedIcon className="form-post__icon" />
            <EmojiEmotionsOutlinedIcon className="form-post__icon" />
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
