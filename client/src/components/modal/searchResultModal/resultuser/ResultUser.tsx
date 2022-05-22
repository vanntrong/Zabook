import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import { selectCurrentUser, userAction } from 'store/slice/userSlice';
import './resultuser.scss';

interface ResultUserProps {
  user: any;
  type: string;
}

interface SearchResultUserProps {
  user: any;
  handleClick: () => void;
}

const SearchResultUser: FC<SearchResultUserProps> = ({ user, handleClick }) => {
  const isDarkMode = useAppSelector(selectTheme);
  return (
    <div className={`result ${isDarkMode ? 'dark' : ''}`}>
      <Link to={`/${user.username}`} className="result-info" onClick={handleClick}>
        <Avatar src={user.avatar} alt={user.fullName} />
        <div className="result-info__name">{user.fullName}</div>
      </Link>
    </div>
  );
};

interface HistoryResultUserProps {
  user: any;
  handleClick: () => void;
  handleDelete: () => void;
}

const HistoryResultUser: FC<HistoryResultUserProps> = ({ user, handleClick, handleDelete }) => {
  const isDarkMode = useAppSelector(selectTheme);
  return (
    <div className={`result ${isDarkMode ? 'dark' : ''}`}>
      <Link to={`/${user.username}`} className="result-info" onClick={handleClick}>
        <Avatar src={user.avatar} alt={user.fullName} />
        <div className="result-info__name">{user.fullName}</div>
      </Link>

      <div className="result-action" onClick={handleDelete}>
        <CloseIcon fontSize="small" htmlColor="#666" />
      </div>
    </div>
  );
};

const ResultUser: FC<ResultUserProps> = ({ user, type }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const handleClick = () => {
    dispatch(userAction.addHistoryRequest({ id: currentUser!._id, historyId: user._id }));
  };

  const handleDeleteClick = () => {
    dispatch(userAction.deleteHistoryRequest({ id: currentUser!._id, historyId: user._id }));
  };

  if (type === 'search') {
    return <SearchResultUser user={user} handleClick={handleClick} />;
  }
  if (type === 'history') {
    return (
      <HistoryResultUser user={user} handleClick={handleClick} handleDelete={handleDeleteClick} />
    );
  }
  return null;
};

export default ResultUser;
