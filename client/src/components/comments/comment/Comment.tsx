import { Avatar } from '@mui/material';
import Backdrop from 'components/backdrop/Backdrop';
import PopUp from 'components/popup/PopUp';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import { GrSend } from 'react-icons/gr';
import { MdDeleteOutline } from 'react-icons/md';
import { commentType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import { selectCurrentUser } from 'store/slice/userSlice';

import './comment.scss';

interface CommentProps {
  comment: commentType;
  onSubmit: (id: string, data: { content: string }) => void;
  onDeleteComment: (id: string) => Promise<void>;
}

const Comment: FC<CommentProps> = ({ comment, onSubmit, onDeleteComment }) => {
  const idCurrentUser = useAppSelector(selectCurrentUser)?._id;
  const isDarkMode = useAppSelector(selectTheme);
  const [isShowCommentPopup, setIsShowCommentPopup] = useState<boolean>(false);
  const [isShowCommentEdit, setIsShowCommentEdit] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>(comment.content);
  const [isOpenPopUp, setIsOpenPopUp] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleCloseInputEdit = () => {
    setIsShowCommentEdit(false);
    setCommentText(comment.content);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 27) {
      handleCloseInputEdit();
    }
  };

  const handleSubmitEditComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentText.trim().length === 0) {
      setError('Comment cannot be empty');
      return;
    }
    onSubmit(comment._id, { content: commentText });
    handleCloseInputEdit();
  };

  const handleDeleteComment = async () => {
    onDeleteComment(comment._id);
  };

  const handleClosePopUp = () => {
    setIsOpenPopUp(false);
  };

  return (
    <div className={`comment ${isDarkMode ? 'dark' : ''}`}>
      <Avatar src={comment.userComment.avatar} />
      {!isShowCommentEdit && (
        <>
          <div className="comment-content">
            <div className="comment-content-user-and-time">
              <p className="comment-user">{comment.userComment.fullName}</p>
              <span>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <p className="comment-text">{comment.content}</p>
          </div>
          {idCurrentUser === comment.userComment._id && (
            <button
              className="comment-button"
              onClick={() => setIsShowCommentPopup((prev) => !prev)}
            >
              <BsThreeDots />
              {isShowCommentPopup && (
                <div className="comment-popup">
                  <div className="comment-popup-item" onClick={() => setIsShowCommentEdit(true)}>
                    <FiEdit2 />
                    <span>Edit Comment</span>
                  </div>
                  <hr />
                  <div className="comment-popup-item" onClick={() => setIsOpenPopUp(true)}>
                    <MdDeleteOutline />
                    <span>Delete Comment</span>
                  </div>
                </div>
              )}
            </button>
          )}
        </>
      )}

      {isShowCommentEdit && (
        <>
          <form
            className="comment-edit"
            onKeyDown={handleKeyDown}
            onSubmit={handleSubmitEditComment}
          >
            <input
              type="text"
              autoFocus
              placeholder="Write your comment here..."
              value={commentText}
              onChange={handleChangeInput}
            />
            <button type="submit">
              <GrSend />
            </button>
            {error && <p className="createComment-error">{error}</p>}
            <div className="comment-edit-cancel">
              Press esc to <span onClick={handleCloseInputEdit}>Cancel</span>
            </div>
          </form>
        </>
      )}
      <PopUp
        isOpen={isOpenPopUp}
        onClose={handleClosePopUp}
        onConfirm={handleDeleteComment}
        type="comment"
      />
      <Backdrop isShow={isOpenPopUp} setIsShow={setIsOpenPopUp} color="#fff" opacity={0.6} />
    </div>
  );
};

export default Comment;
