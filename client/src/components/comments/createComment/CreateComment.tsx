import { Avatar } from '@mui/material';
import React, { FC, useState } from 'react';
import { GrSend } from 'react-icons/gr';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import { selectCurrentUser } from 'store/slice/userSlice';
import './createComment.scss';

interface CreateCommentProps {
  postId: string;
  onSubmit: (data: any) => Promise<void>;
}

const CreateComment: FC<CreateCommentProps> = ({ postId, onSubmit }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const isDarkMode = useAppSelector(selectTheme);
  const [commentText, setCommentText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentText.trim().length === 0) {
      setError('Comment cannot be empty');
      return;
    }
    const data = {
      userComment: currentUser?._id,
      content: commentText,
    };
    onSubmit(data);
    setCommentText('');
  };
  return (
    <div className={`createComment ${isDarkMode ? 'dark' : ''}`}>
      <Avatar
        className="createComment-user-avatar"
        src={currentUser?.avatar}
        alt={currentUser?.fullName}
      />
      <form className="createComment-input" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Write your comment here..."
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
            setError(null);
          }}
        />
        <button type="submit">
          <GrSend />
        </button>
        {error && <p className="createComment-error">{error}</p>}
      </form>
    </div>
  );
};

export default CreateComment;
