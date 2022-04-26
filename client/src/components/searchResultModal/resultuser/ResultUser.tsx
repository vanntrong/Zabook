import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
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
  return (
    <div className="result">
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
  return (
    <div className="result">
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
    if (currentUser!.historySearch.includes(user.id) || currentUser?._id === user._id) {
      return;
    } else {
      dispatch(userAction.addHistoryRequest({ id: currentUser!._id, historyId: user._id }));
    }
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
