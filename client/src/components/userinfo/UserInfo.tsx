import { Avatar } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserType } from 'shared/types';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AiOutlineMessage } from 'react-icons/ai';
import './userinfo.scss';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import {
  deleteFriendRequestApi,
  getFriendRequestApi,
  sendFriendRequestApi,
} from 'api/friendRequestApi';
import CircularProgress from '@mui/material/CircularProgress';
import { BiUserCheck } from 'react-icons/bi';
import { BiUserX } from 'react-icons/bi';

interface UserInfoProps {
  user: UserType | null;
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isSendFriendRequest, setIsSendFriendRequest] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const getFriendRequest = async () => {
      const res = await getFriendRequestApi({ requester: currentUser!._id, receiver: user!._id });
      if (res.status === 'request not found') {
        setIsSendFriendRequest(false);
      } else {
        setIsSendFriendRequest(true);
      }
    };
    getFriendRequest();
  }, [currentUser, user]);

  const sendFriendRequestHandler = async () => {
    setIsPending(true);
    const res = await sendFriendRequestApi({ requester: currentUser!._id, receiver: user!._id });
    if (res) {
      setIsPending(false);
      setIsSendFriendRequest(true);
    } else {
      setIsPending(false);
    }
  };

  const cancelFriendRequestHandler = async () => {
    await deleteFriendRequestApi({ requester: currentUser!._id, receiver: user!._id });
    setIsSendFriendRequest(false);
  };

  return (
    <>
      <div className="userInfo">
        <div className="userInfo-wrapper">
          <div className="userInfo-background-image">
            <img src="http://uitheme.net/sociala/images/u-bg.jpg" alt="" />
          </div>
          <div className="userInfo-avatar-and-name">
            <Avatar className="userInfo-avatar" src={user?.avatar} alt="" />
            <div className="userInfo-name">
              <h2>{user?.fullName}</h2>
              <p>{user?.email}</p>
            </div>
            {currentUser!.username !== user?.username && (
              <div className="userInfo-action">
                {currentUser?.friends.includes(user!._id) ? (
                  <button className="userInfo-addFriend">
                    <BiUserCheck /> Friends
                  </button>
                ) : !isSendFriendRequest ? (
                  <button className="userInfo-addFriend" onClick={sendFriendRequestHandler}>
                    {isPending ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <AiOutlineUserAdd />
                    )}{' '}
                    Add Friend
                  </button>
                ) : (
                  <button className="userInfo-addFriend" onClick={cancelFriendRequestHandler}>
                    <BiUserX /> Cancel Request
                  </button>
                )}
                <button className="userInfo-sendMessage">
                  <AiOutlineMessage /> Send Message
                </button>
              </div>
            )}
          </div>
        </div>
        <hr />
        <div className="userInfo-navigate">
          <NavLink
            to={`/${user?.username}`}
            className={({ isActive }) =>
              isActive ? 'userInfo-navigate-item active' : 'userInfo-navigate-item'
            }
          >
            <span>About</span>
          </NavLink>
          <NavLink
            to={`/${user?.username}/videos`}
            className={({ isActive }) =>
              isActive ? 'userInfo-navigate-item active' : 'userInfo-navigate-item'
            }
          >
            <span>Videos</span>
          </NavLink>
          <NavLink
            to={`/${user?.username}/photos`}
            className={({ isActive }) =>
              isActive ? 'userInfo-navigate-item active' : 'userInfo-navigate-item'
            }
          >
            <span>Photos</span>
          </NavLink>
          <NavLink
            to={`/${user?.username}/friends`}
            className={({ isActive }) =>
              isActive ? 'userInfo-navigate-item active' : 'userInfo-navigate-item'
            }
          >
            <span>Friends</span>
          </NavLink>
          <NavLink
            to={`/${user?.username}/groups`}
            className={({ isActive }) =>
              isActive ? 'userInfo-navigate-item active' : 'userInfo-navigate-item'
            }
          >
            <span>Group</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
