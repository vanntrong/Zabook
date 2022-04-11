import React from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

import './inputpost.scss';

const InputPost = () => {
  return (
    <form className="form-post">
      <div className="user-image">
        <img
          src="https://images.unsplash.com/photo-1644982647844-5ee1bdc5b114?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt=""
        />
      </div>
      <div className="form-post__group">
        <input type="text" placeholder="What's on your mind?" />
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