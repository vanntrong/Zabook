import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Avatar, Paper } from '@mui/material';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { PostType, UserType } from 'shared/types';
import './post.scss';
import PostAssets from './PostAssets';

interface PostProps {
  post: PostType;
  user: UserType;
}

const Post: FC<PostProps> = ({ post, user }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLikePost = () => {
    setIsLiked((prevState) => !prevState);
  };
  return (
    <Paper className="post" variant="outlined" square>
      <div className="post-info">
        <div className="post-info__left">
          <div className="post-user__image">
            <Avatar src={user?.avatar} alt={user?.username} sx={{ width: 60, height: 60 }} />
          </div>
          <div className="post-user__info">
            <h4 className="post-username">{user?.firstName + ' ' + user?.lastName}</h4>
            <span className="post-time">{moment(post?.createdAt).format('LLLL')}</span>
          </div>
        </div>
        <div className="post-info__right">
          <MoreHorizIcon color="inherit" fontSize="large" />
        </div>
      </div>
      <div className="post-content">
        <p>{post?.content}</p>
        <div className="post-image">{post?.assets && <PostAssets assets={post?.assets} />}</div>
      </div>
      <div className="post-action">
        <div className="post-action__list">
          <div className="post-action__item" onClick={handleLikePost}>
            <ThumbUpOutlinedIcon color={isLiked ? 'primary' : 'inherit'} />
            <span>{post?.likes?.length}</span>
          </div>
          <div className="post-action__item">
            <ChatBubbleOutlineOutlinedIcon color="inherit" />
            <span>{post?.comments?.length}</span>
          </div>
          <div className="post-action__item">
            <ReplyOutlinedIcon color="inherit" />
            <span>{post?.shares?.length}</span>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default Post;
