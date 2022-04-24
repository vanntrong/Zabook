import { Avatar, Paper } from '@mui/material';
import InputEditPostModal from 'components/input/InputPost/inputEditPostModal/InputEditPostModal';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { FiEdit2, FiShare2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { PostType } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { postAction } from 'store/slice/postSlice';
import { selectCurrentUser } from 'store/slice/userSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './post.scss';
import PostAssets from './PostAssets';
import { Comments } from 'components/comments/Comments';

interface PostProps {
  // className?: string;
  post: PostType;
}

const Post: FC<PostProps> = ({ post }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isLiked, setIsLiked] = useState<boolean>(post.likes!.includes(currentUser!._id));
  const [isShowModalMenu, setIsShowModalMenu] = useState<boolean>(false);
  const [isShowPostModal, setIsShowPostModal] = useState<boolean>(false);
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [isShowComments, setIsShowComments] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleLikePost = () => {
    setIsLiked((prevState) => !prevState);
    dispatch(postAction.likePostRequest({ id: post._id, data: currentUser!._id }));
  };

  const handleClickOpenDialog = () => {
    setIsShowDialog(true);
  };

  const handleCloseDialog = () => {
    setIsShowDialog(false);
  };

  const deletePostHandler = () => {
    dispatch(postAction.deletePostRequest(post._id));
    handleCloseDialog();
  };

  return (
    <>
      <Paper className="post" elevation={0}>
        <div className="post-top">
          <div className="post-top-info">
            <Avatar className="post-top-user-avatar" src={post?.userPost.avatar} alt="" />
            <div className="post-top-user-info">
              <h3 className="post-top-user-name">{post?.userPost.fullName}</h3>
              <p className="post-top-user-time">{moment(post?.createdAt).fromNow()}</p>
            </div>
          </div>
          <div className="post-top-setting" onClick={() => setIsShowModalMenu(!isShowModalMenu)}>
            <BsThreeDots />
            {isShowModalMenu && (
              <div className="post-setting-modal">
                <div className="post-setting-modal-item" onClick={() => setIsShowPostModal(true)}>
                  <FiEdit2 />
                  <span>Edit Post</span>
                </div>
                <hr />
                <div className="post-setting-modal-item" onClick={handleClickOpenDialog}>
                  <MdDeleteOutline />
                  <span>Delete Post</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="post-content">
          {post?.content.length > 150 ? (
            <p className="post-content-text">
              {post?.content.slice(0, 150)} <span>See more</span>
            </p>
          ) : (
            <p className="post-content-text">{post?.content}</p>
          )}

          <div className="post-content-assets">
            {post?.assets && post?.assets.length > 0 && <PostAssets assets={post?.assets} />}
          </div>
        </div>
        <div className="post-action">
          <div className="post-action-wrapper">
            <div className="post-action-item" onClick={handleLikePost}>
              {isLiked ? <FcLike /> : <AiOutlineLike />}
              <span>
                {post.likes?.length} {post.likes!.length > 1 ? 'Likes' : 'Like'}
              </span>
            </div>
            <div className="post-action-item" onClick={() => setIsShowComments((prev) => !prev)}>
              <FaRegComment />
              <span>
                {post.comments?.length} {post.comments!.length > 1 ? 'Comments' : 'Comments'}
              </span>
            </div>
          </div>
          <div className="post-action-item">
            <FiShare2 />
          </div>
        </div>
        {isShowComments && <Comments postId={post._id} />}
      </Paper>
      {isShowPostModal && (
        <InputEditPostModal setIsShowPostModal={setIsShowPostModal} post={post} />
      )}
      <Dialog
        open={isShowDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete this post?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your post will be deleted, you will not be able to undo this action
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseDialog} className="cancel-delete">
            Cancel
          </button>
          <button onClick={deletePostHandler} autoFocus className="confirm-delete">
            Delete
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Post;
