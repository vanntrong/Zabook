import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';
import React, { FC } from 'react';
import './resultuser.scss';
import { Link } from 'react-router-dom';

interface ResultUserProps {
  // user: {
  //   _id: string;
  //   avatar: string;
  //   username: string;
  //   fullName: string;
  //   id: string;
  // };
  user: any;
  type: string;
}

const ResultUser: FC<ResultUserProps> = ({ user, type }) => {
  return (
    <div className="result">
      <Link to={`/${user.username}`} className="result-info">
        <Avatar src={user.avatar} alt={user.fullName} />
        <div className="result-info__name">{user.fullName}</div>
      </Link>
      {type === 'history' && (
        <div className="result-action">
          <CloseIcon fontSize="small" htmlColor="#666" />
        </div>
      )}
    </div>
  );
};

export default ResultUser;
