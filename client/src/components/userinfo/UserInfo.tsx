import { Avatar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {
  acceptFriendRequestApi,
  declineFriendRequestApi,
  deleteFriendRequestApi,
  getFriendRequestApi,
  sendFriendRequestApi,
} from 'api/friendRequestApi';
import Backdrop from 'components/backdrop/Backdrop';
import PopUp from 'components/popup/PopUp';
import React, { FC, useEffect, useState } from 'react';
import { AiOutlineMessage, AiOutlineUserAdd } from 'react-icons/ai';
import { FiUserCheck, FiUserX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { friendRequestType, UserType } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import { selectCurrentUser, userAction } from 'store/slice/userSlice';
import { socket } from 'utils/socket';
import './userinfo.scss';

interface UserInfoProps {
  user: UserType | null;
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const isDarkMode = useAppSelector(selectTheme);
  const [isSendFriendRequest, setIsSendFriendRequest] = useState(false);
  const [isReceivedFriendRequest, setIsReceivedFriendRequest] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isShowFriendMenu, setIsShowFriendMenu] = useState(false);
  const [isShowFriendPopup, setIsShowFriendPopup] = useState(false);
  const [isShowFriendRequestMenu, setIsShowFriendRequestMenu] = useState(false);
  const [friendRequest, setFriendRequest] = useState<friendRequestType | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getFriendRequest = async () => {
      const { isFound, friendRequest } = await getFriendRequestApi({
        requester: currentUser!._id,
        receiver: user!._id,
      });
      if (isFound) {
        setFriendRequest(friendRequest);
        setIsSendFriendRequest(true);
      } else {
        setIsSendFriendRequest(false);
      }
    };
    getFriendRequest();
  }, [currentUser, user]);

  useEffect(() => {
    const getFriendRequest = async () => {
      const { isFound, friendRequest } = await getFriendRequestApi({
        requester: user!._id,
        receiver: currentUser!._id,
      });
      if (isFound) {
        setFriendRequest(friendRequest);
        setIsReceivedFriendRequest(true);
      } else {
        setIsReceivedFriendRequest(false);
      }
    };
    getFriendRequest();
  }, [currentUser, user]);

  const sendFriendRequestHandler = async () => {
    setIsPending(true);
    const { friendRequest, notification } = await sendFriendRequestApi({
      requester: currentUser!._id,
      receiver: user!._id,
    });
    if (friendRequest) {
      socket.emit('send-friend-request', friendRequest);
      socket.emit('send-notification', notification);
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

  const deleteFriendHandler = () => {
    dispatch(userAction.deleteFriendRequest({ id: currentUser!._id, friendId: user!._id }));
    setIsShowFriendMenu(false);
    handleClosePopup();
  };

  const handleClosePopup = () => {
    setIsShowFriendPopup(false);
  };

  const confirmFriendRequestHandler = async () => {
    if (friendRequest) {
      const { message, notification } = await acceptFriendRequestApi(friendRequest._id);
      if (message) {
        dispatch(userAction.addFriend(user!._id));
        socket.emit('send-notification', notification);
        setIsReceivedFriendRequest(false);
        setIsShowFriendRequestMenu(false);
        setIsSendFriendRequest(false);
      }
    }
  };

  const declineFriendRequestHandler = async () => {
    if (friendRequest) {
      const res = await declineFriendRequestApi(friendRequest._id);
      if (res) {
        setIsReceivedFriendRequest(false);
        setIsShowFriendRequestMenu(false);
        setIsSendFriendRequest(false);
      }
    }
  };

  return (
    <>
      <div className={`userInfo ${isDarkMode ? 'dark' : ''}`}>
        <div className="userInfo-wrapper">
          <div className="userInfo-background-image">
            <img
              src="https://res.cloudinary.com/drwm3i3g4/image/upload/v1652242981/u-bg_ru24wt.jpg"
              alt=""
            />
          </div>
          <div className="userInfo-avatar-and-name">
            <Avatar className="userInfo-avatar" src={user?.avatar} alt="" />
            <div className="userInfo-name">
              <h2>{user?.fullName}</h2>
              <p>{user?.email}</p>
            </div>
            {currentUser!.username !== user?.username && (
              <div className="userInfo-action">
                {currentUser?.friends.includes(user!._id) && (
                  <button
                    className="userInfo-addFriend"
                    style={{ position: 'relative' }}
                    onClick={() => setIsShowFriendMenu((prev) => !prev)}
                  >
                    <FiUserCheck /> Friends
                    {isShowFriendMenu && (
                      <div className="userInfo-friend-modal">
                        <div
                          className="userInfo-friend-modal-item"
                          onClick={() => setIsShowFriendPopup(true)}
                        >
                          <FiUserX /> Delete Friend
                        </div>
                      </div>
                    )}
                  </button>
                )}
                {!currentUser?.friends.includes(user!._id) &&
                  !isSendFriendRequest &&
                  !isReceivedFriendRequest && (
                    <button className="userInfo-addFriend" onClick={sendFriendRequestHandler}>
                      {isPending ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <AiOutlineUserAdd />
                      )}{' '}
                      Add Friend
                    </button>
                  )}
                {!currentUser?.friends.includes(user!._id) &&
                  isSendFriendRequest &&
                  !isReceivedFriendRequest && (
                    <button className="userInfo-addFriend" onClick={cancelFriendRequestHandler}>
                      <FiUserX /> Cancel Request
                    </button>
                  )}
                {!currentUser?.friends.includes(user!._id) &&
                  !isSendFriendRequest &&
                  isReceivedFriendRequest && (
                    <button
                      className="userInfo-addFriend"
                      style={{ position: 'relative' }}
                      onClick={() => setIsShowFriendRequestMenu((prev) => !prev)}
                    >
                      <FiUserCheck /> Response
                      {isShowFriendRequestMenu && (
                        <div className="userInfo-friend-modal">
                          <div
                            className="userInfo-friend-modal-item"
                            onClick={confirmFriendRequestHandler}
                          >
                            Confirm
                          </div>
                          <div
                            className="userInfo-friend-modal-item"
                            onClick={declineFriendRequestHandler}
                          >
                            Delete Request
                          </div>
                        </div>
                      )}
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
            end
            to={`/${user?.username}`}
            className={({ isActive }) =>
              isActive ? 'userInfo-navigate-item active' : 'userInfo-navigate-item'
            }
          >
            <span>About</span>
          </NavLink>
          <NavLink
            end
            to={`/${user?.username}/videos`}
            className={({ isActive }) =>
              isActive ? 'userInfo-navigate-item active' : 'userInfo-navigate-item'
            }
          >
            <span>Videos</span>
          </NavLink>
          <NavLink
            end
            to={`/${user?.username}/photos`}
            className={({ isActive }) =>
              isActive ? 'userInfo-navigate-item active' : 'userInfo-navigate-item'
            }
          >
            <span>Photos</span>
          </NavLink>
          <NavLink
            end
            to={`/${user?.username}/friends`}
            className={({ isActive }) =>
              isActive ? 'userInfo-navigate-item active' : 'userInfo-navigate-item'
            }
          >
            <span>Friends</span>
          </NavLink>
        </div>
      </div>
      <PopUp
        isOpen={isShowFriendPopup}
        onClose={handleClosePopup}
        onConfirm={deleteFriendHandler}
        type="friend"
      />
      <Backdrop
        isShow={isShowFriendPopup}
        setIsShow={setIsShowFriendPopup}
        color="#fff"
        opacity={0.5}
      />
    </>
  );
};

export default UserInfo;
