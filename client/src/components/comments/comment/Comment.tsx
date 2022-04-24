import { Avatar } from '@mui/material';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import { GrSend } from 'react-icons/gr';
import { MdDeleteOutline } from 'react-icons/md';
import { commentType } from 'shared/types';
import './comment.scss';

interface CommentProps {
  comment: commentType;
  onSubmit: (id: string, data: { content: string }) => void;
}

const Comment: FC<CommentProps> = ({ comment, onSubmit }) => {
  const [isShowCommentPopup, setIsShowCommentPopup] = useState<boolean>(false);
  const [isShowCommentEdit, setIsShowCommentEdit] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>(comment.content);
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

  return (
    <div className="comment">
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
          <button className="comment-button" onClick={() => setIsShowCommentPopup((prev) => !prev)}>
            <BsThreeDots />
            {isShowCommentPopup && (
              <div className="comment-popup">
                <div className="comment-popup-item" onClick={() => setIsShowCommentEdit(true)}>
                  <FiEdit2 />
                  <span>Edit Comment</span>
                </div>
                <hr />
                <div className="comment-popup-item">
                  <MdDeleteOutline />
                  <span>Delete Comment</span>
                </div>
              </div>
            )}
          </button>
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
    </div>
  );
};

export default Comment;
