import { Avatar } from '@mui/material';
import { deleteFriendRequestApi, sendFriendRequestApi } from 'api/friendRequestApi';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { DifferentUserType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import { selectCurrentUser } from 'store/slice/userSlice';
import { socket } from 'utils/socket';

import './suggestFriend.scss';

interface Props {
  user: DifferentUserType;
  setSuggestFriends: React.Dispatch<React.SetStateAction<DifferentUserType[]>>;
}

const SuggestFriend: FC<Props> = ({ user, setSuggestFriends }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const isDarkMode = useAppSelector(selectTheme);
  const [isSendFriendRequest, setIsSendFriendRequest] = React.useState(false);

  const sendFriendRequestHandler = async () => {
    const { friendRequest, notification } = await sendFriendRequestApi({
      requester: currentUser!._id,
      receiver: user._id,
    });
    if (friendRequest) {
      setIsSendFriendRequest(true);
      socket.emit('send-friend-request', friendRequest);
      socket.emit('send-notification', notification);
    }
  };

  const cancelFriendRequestHandler = async () => {
    await deleteFriendRequestApi({ requester: currentUser!._id, receiver: user!._id });
    setIsSendFriendRequest(false);
  };
  return (
    <div className={`suggestFriend ${isDarkMode ? 'dark' : ''}`}>
      <div className="suggestFriend-info">
        <Avatar src={user.avatar} className="suggestFriend-avatar" />
        <Link to={`/${user.username}`}>
          <h4 className="suggestFriend-name">{user.fullName}</h4>
        </Link>
      </div>
      <div className="suggestFriend-action">
        {!isSendFriendRequest && (
          <button
            className="suggestFriend-button suggestFriend-button-confirm"
            onClick={sendFriendRequestHandler}
          >
            Add Friend
          </button>
        )}
        {isSendFriendRequest && (
          <button
            className="suggestFriend-button suggestFriend-button-confirm"
            onClick={cancelFriendRequestHandler}
          >
            Cancel Request
          </button>
        )}
        <button
          className="suggestFriend-button suggestFriend-button-delete"
          onClick={() =>
            setSuggestFriends((prev) => prev.filter((friend) => friend._id !== user._id))
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SuggestFriend;
