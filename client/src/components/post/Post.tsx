import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import { Avatar, Paper } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Comments } from 'components/comments/Comments';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { PostType, UserType } from 'shared/types';
import EditIcon from '@mui/icons-material/Edit';
import './post.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import PostAssets from './PostAssets';
import InputEditPostModal from 'components/input/InputPost/inputEditPostModal/InputEditPostModal';
import Backdrop from 'components/Backdrop';

interface PostProps {
  className?: string;
  post: PostType;
  user: UserType | null;
}

const Post: FC<PostProps> = ({ post, user, className }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isShowModalMenu, setIsShowModalMenu] = useState<boolean>(false);
  const [isShowPostModal, setIsShowPostModal] = useState<boolean>(false);
  const handleLikePost = () => {
    setIsLiked((prevState) => !prevState);
  };

  return (
    <Paper
      className={'post ' + (className ? className : '')}
      variant="outlined"
      square
      elevation={0}
    >
      <div className="post-info">
        <div className="post-info__left">
          <Avatar src={user?.avatar} alt={user?.username} className="post-user__image" />
          <div className="post-user__info">
            <h4 className="post-username">{user?.firstName + ' ' + user?.lastName}</h4>
            <span className="post-time">{moment(post?.createdAt).format('LLLL')}</span>
          </div>
        </div>
        <div className="post-info__right" onClick={() => setIsShowModalMenu((prev) => !prev)}>
          <MoreHorizIcon color="inherit" fontSize="large" />
          {isShowModalMenu && (
            <div className="modal-edit-post">
              <div
                className="edit-button button-edit-post"
                onClick={() => setIsShowPostModal(true)}
              >
                <EditIcon /> Edit Post
              </div>
              <div className="edit-button button-delete-post">
                <DeleteIcon /> Delete Post
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="post-content">
        <p>{post?.content}</p>
        <div className="post-image">{post?.assets && <PostAssets assets={post?.assets} />}</div>
        <div className="like-count">
          <AvatarGroup max={4} className="post-user-group">
            <Avatar
              sx={{ width: 24, height: 24 }}
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
            <Avatar
              sx={{ width: 24, height: 24 }}
              alt="Travis Howard"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
            <Avatar
              sx={{ width: 24, height: 24 }}
              alt="Cindy Baker"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
            <Avatar
              sx={{ width: 24, height: 24 }}
              alt="Agnes Walker"
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
            <Avatar
              sx={{ width: 24, height: 24 }}
              alt="Trevor Henderson"
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
            <Avatar
              sx={{ width: 24, height: 24 }}
              alt="Trevor Henderson"
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
            <Avatar
              sx={{ width: 24, height: 24 }}
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
            <div onClick={handleLikePost}>
              <ThumbUpRoundedIcon htmlColor={isLiked ? '#be185d' : 'inherit'} />
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
      {isShowPostModal && (
        <InputEditPostModal
          post={post}
          setIsShowPostModal={setIsShowPostModal}
          currentUser={user}
        />
      )}
      <Backdrop isShow={isShowPostModal} setIsShow={setIsShowPostModal} color="#fff" />
    </Paper>
  );
};

export default Post;
