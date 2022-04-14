import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Avatar from '@mui/material/Avatar';
import React, { FC } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import './inputpost.scss';

interface InputPostProps {
  className?: string;
}

const InputPost: FC<InputPostProps> = ({ className }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <form className={`form-post ${className ? className : ''}`}>
      <div className="user-image">
        <Avatar src={currentUser?.avatar} alt="" />
      </div>
      <div className="form-post__group">
        <input type="text" placeholder={`What's on your mind, ${currentUser?.lastName}? `} />
        <div className="form-input__image">
          <ImageOutlinedIcon className="form-post__icon" />
          <PersonOutlineOutlinedIcon className="form-post__icon" />
          <EmojiEmotionsOutlinedIcon className="form-post__icon" />
        </div>
      </div>
    </form>
  );
};

export default InputPost;
