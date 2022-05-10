import { Avatar } from '@mui/material';
import { acceptFriendRequestApi, declineFriendRequestApi } from 'api/friendRequestApi';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { friendRequestType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import { socket } from 'utils/socket';

import './friendRequest.scss';

interface FriendRequestProps {
  friendRequest: friendRequestType;
  setFriendsRequest: React.Dispatch<React.SetStateAction<friendRequestType[]>>;
}

const FriendRequest: FC<FriendRequestProps> = ({ friendRequest, setFriendsRequest }) => {
  const [isAccept, setIsAccept] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const isDarkMode = useAppSelector(selectTheme);

  const confirmFriendRequestHandler = async () => {
    const { message, notification } = await acceptFriendRequestApi(friendRequest._id);
    if (message) {
      setIsAccept(true);
      socket.emit('send-notification', notification);
      setTimeout(() => {
        setFriendsRequest((prevState) => prevState.filter((fr) => fr._id !== friendRequest._id));
      }, 1000);
    }
  };

  const declineFriendRequestHandler = async () => {
    const res = await declineFriendRequestApi(friendRequest._id);
    if (res) {
      setIsRemove(true);
      setTimeout(() => {
        setFriendsRequest((prevState) => prevState.filter((fr) => fr._id !== friendRequest._id));
      }, 1000);
    }
  };
  return (
    <div className={`friend-request ${isDarkMode ? 'dark' : ''}`}>
      <div className="friend-request-info">
        <Avatar className="friend-request-avatar" src={friendRequest.requester.avatar} alt="" />
        <div className="friend-request-name">
          <Link to={`/${friendRequest.requester.username}`}>
            <h4>{friendRequest.requester.fullName}</h4>
          </Link>
          <span>{moment(friendRequest.createdAt).format('DD/MM/YYYY')}</span>
        </div>
      </div>
      {isAccept && <p className="friend-request-accepted">Request Accepted</p>}
      {isRemove && <p className="friend-request-accepted">Request Removed</p>}

      {!isAccept && !isRemove && (
        <div className="friend-request-action">
          <button
            className="friend-request-button friend-request-button-confirm"
            onClick={confirmFriendRequestHandler}
          >
            Confirm
          </button>
          <button
            className="friend-request-button friend-request-button-delete"
            onClick={declineFriendRequestHandler}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendRequest;
