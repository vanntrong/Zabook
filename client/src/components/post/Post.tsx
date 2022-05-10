import { Avatar, Paper } from '@mui/material';
import { deletePostApi, likePostApi } from 'api/postApi';
import Backdrop from 'components/backdrop/Backdrop';
import { Comments } from 'components/comments/Comments';
import InputEditPostModal from 'components/input/InputPost/inputEditPostModal/InputEditPostModal';
import PopUp from 'components/popup/PopUp';
import moment from 'moment';
import React, { FC, useCallback, useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { FiEdit2, FiShare2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { PostType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import { socket } from 'utils/socket';
import './post.scss';
import PostAssets from './PostAssets';
import { FacebookShareButton } from 'react-share';
import { selectTheme } from 'store/slice/themeSlice';

interface PostProps {
  // className?: string;
  post: PostType;
  setPosts?: React.Dispatch<React.SetStateAction<PostType[]>>;
}

const Post: FC<PostProps> = ({ post, setPosts }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isLiked, setIsLiked] = useState<boolean>(post.likes!.includes(currentUser!._id));
  const [isShowModalMenu, setIsShowModalMenu] = useState<boolean>(false);
  const [isShowPostModal, setIsShowPostModal] = useState<boolean>(false);
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [isShowComments, setIsShowComments] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState<number>(post.comments.length);
  const [likeCount, setLikeCount] = useState<number>(post.likes?.length || 0);
  const [isHidePostContent, setIsHidePostContent] = useState<boolean>(post.content.length > 150);
  const isDarkMode = useAppSelector(selectTheme);

  const handleLikePost = async () => {
    setIsLiked((prevState) => !prevState);
    const { notification } = await likePostApi({
      id: post._id,
      data: currentUser!._id,
    });
    if (notification) {
      socket.emit('send-notification', notification);
    }
    setLikeCount((prevState) => prevState + (isLiked ? -1 : 1));
  };

  const handleClickOpenDialog = () => {
    setIsShowDialog(true);
  };

  const handleCloseDialog = () => {
    setIsShowDialog(false);
  };

  const deletePostHandler = async () => {
    // dispatch(postAction.deletePostRequest(post._id));
    await deletePostApi(post._id);
    if (setPosts) {
      setPosts((prevState) => prevState.filter((item) => item._id !== post._id));
    }
    handleCloseDialog();
  };

  // this function handle comment count when comment is deleted from component Comments
  const onDeleteComment = useCallback(() => {
    setCommentCount((prev) => prev - 1);
  }, []);

  // this function handle comment count when comment is deleted from component Comments
  const onAddComment = useCallback(() => {
    setCommentCount((prev) => prev + 1);
  }, []);

  return (
    <>
      <Paper className={`post ${isDarkMode ? 'dark' : ''}`} elevation={0}>
        <div className="post-top">
          <div className="post-top-info">
            <Avatar className="post-top-user-avatar" src={post?.userPost.avatar} alt="" />
            <div className="post-top-user-info">
              <h3 className="post-top-user-name">
                {post?.userPost.fullName}
                {post.tagsPeople.length > 0 && (
                  <div className="userTags">
                    {' '}
                    is with{' '}
                    <Link to={`/${post.tagsPeople[0].username}`}>
                      {post.tagsPeople[0].fullName}
                    </Link>{' '}
                    {post.tagsPeople.length > 1 && (
                      <>
                        <span>and </span>
                        <div className="userTags-other">
                          <span>{post.tagsPeople.length - 1} others</span>
                          <div className="userTags-other-list">
                            {post.tagsPeople.slice(1).map((user) => (
                              <Link to={`/${user.username}`} key={user._id}>
                                {user.fullName}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </h3>
              <p className="post-top-user-time">{moment(post?.createdAt).fromNow()}</p>
            </div>
          </div>
          {currentUser?._id === post?.userPost._id && (
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
          )}
        </div>
        <div className="post-content">
          {isHidePostContent ? (
            <p className="post-content-text">
              {post?.content.slice(0, 150)}{' '}
              <span onClick={() => setIsHidePostContent(false)}>See more</span>
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
                {likeCount} {likeCount > 1 ? 'Likes' : 'Like'}
              </span>
            </div>
            <div className="post-action-item" onClick={() => setIsShowComments((prev) => !prev)}>
              <FaRegComment />
              <span>
                {commentCount} {commentCount > 1 ? 'Comments' : 'Comments'}
              </span>
            </div>
          </div>
          <div className="post-action-item">
            <FacebookShareButton
              url={`https://sociala-b253c.web.app/post/${post._id}`}
              hashtag="vantrong.dev"
            >
              <FiShare2 />
            </FacebookShareButton>
          </div>
        </div>
        {isShowComments && (
          <Comments
            postId={post._id}
            onDeleteComment={onDeleteComment}
            onAddComment={onAddComment}
            commentCount={commentCount}
          />
        )}
      </Paper>
      {isShowPostModal && (
        <InputEditPostModal
          setIsShowPostModal={setIsShowPostModal}
          post={post}
          setPosts={setPosts}
        />
      )}
      <PopUp
        isOpen={isShowDialog}
        onClose={handleCloseDialog}
        onConfirm={deletePostHandler}
        type="post"
      />
      <Backdrop isShow={isShowDialog} setIsShow={setIsShowDialog} color="#fff" opacity={0.6} />
    </>
  );
};

export default Post;
