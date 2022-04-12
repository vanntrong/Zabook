import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';

import './post.scss';
import { Avatar, Paper } from '@mui/material';
import PostAssets from './PostAssets';

const assets = [
  'https://images.unsplash.com/photo-1649390696517-0457ad3ffafb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1649266627098-cc1bb09778b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1649458556963-0d070f0bd1c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1649420050344-1bfba75b4658?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  'https://images.unsplash.com/photo-1649331556794-31d8dee096ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
];
// const assets2 = [
//   'https://images.unsplash.com/photo-1649390696517-0457ad3ffafb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
//   'https://images.unsplash.com/photo-1649266627098-cc1bb09778b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
//   'https://images.unsplash.com/photo-1649458556963-0d070f0bd1c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
//   'https://images.unsplash.com/photo-1649420050344-1bfba75b4658?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
//   'https://images.unsplash.com/photo-1649331556794-31d8dee096ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
//   'https://images.unsplash.com/photo-1649420050344-1bfba75b4658?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
//   'https://images.unsplash.com/photo-1649331556794-31d8dee096ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
// ];
// const assets3 = [
//   'https://images.unsplash.com/photo-1649390696517-0457ad3ffafb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
// ];

const Post = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLikePost = () => {
    setIsLiked((prevState) => !prevState);
  };
  return (
    <Paper className="post" variant="outlined" square>
      <div className="post-info">
        <div className="post-info__left">
          <div className="post-user__image">
            <Avatar
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              sx={{ width: 60, height: 60 }}
            />
          </div>
          <div className="post-user__info">
            <h4 className="post-username">Jacky Henry</h4>
            <span className="post-time">8:15PM, yesterday</span>
          </div>
        </div>
        <div className="post-info__right">
          <MoreHorizIcon color="inherit" fontSize="large" />
        </div>
      </div>
      <div className="post-content">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged.
        </p>
        <div className="post-image">
          <PostAssets assets={assets} />
        </div>
      </div>
      <div className="post-action">
        <div className="post-action__list">
          <div className="post-action__item" onClick={handleLikePost}>
            <ThumbUpOutlinedIcon color={isLiked ? 'primary' : 'inherit'} />
            <span>32</span>
          </div>
          <div className="post-action__item">
            <ChatBubbleOutlineOutlinedIcon color="inherit" />
            <span>12</span>
          </div>
          <div className="post-action__item">
            <ReplyOutlinedIcon color="inherit" />
            <span>22</span>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default Post;
