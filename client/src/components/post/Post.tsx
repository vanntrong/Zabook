import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import { Avatar, Paper } from '@mui/material';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { PostType, UserType } from 'shared/types';
import './post.scss';
import PostAssets from './PostAssets';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Comments } from 'components/comments/Comments';

interface PostProps {
  className?: string;
  post: PostType;
  user: UserType | null;
}

const Post: FC<PostProps> = ({ post, user, className }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const handleLikePost = () => {
    setIsLiked((prevState) => !prevState);
  };
  return (
    <Paper className={'post ' + className} variant="outlined" square>
      <div className="post-info">
        <div className="post-info__left">
          <Avatar src={user?.avatar} alt={user?.username} className="post-user__image" />
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
        <div className="like-count">
          <AvatarGroup max={4} className="post-user-group">
            <Avatar
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
            <Avatar
              alt="Travis Howard"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
            <Avatar
              alt="Cindy Baker"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
            <Avatar
              alt="Agnes Walker"
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
            <Avatar
              alt="Trevor Henderson"
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
            <Avatar
              alt="Trevor Henderson"
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
            <Avatar
              alt="Trevor Henderson"
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
          </AvatarGroup>
          <span style={{ cursor: 'pointer' }}>Liked this post</span>
        </div>
      </div>
      <div className="post-action">
        <div className="post-action__list">
          <div className="post-action__item">
            <div>
              <ThumbUpRoundedIcon color={isLiked ? 'primary' : 'inherit'} />
              <span>Like</span>
            </div>
            <div>
              <CommentRoundedIcon color="inherit" />
              <span>Comment</span>
            </div>
          </div>
          <div className="post-action__item">
            <div>
              <ShareIcon color="inherit" />
              <span>Share</span>
            </div>
          </div>
        </div>
      </div>
      <div className="post-comments">
        <div className="post-add-comment">
          <Avatar src={user?.avatar} alt={user?.username} className="post-user__image" />
          <input type="text" placeholder="Add your comment..." />
        </div>
        <Comments />
      </div>
    </Paper>
  );
};

export default Post;
