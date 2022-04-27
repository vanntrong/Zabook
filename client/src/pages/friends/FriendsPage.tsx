import { Avatar } from '@mui/material';
import { getFriendListApi, getProfileOtherApi } from 'api/userApi';
import Backdrop from 'components/backdrop/Backdrop';
import withLayout from 'components/layout/Layout';
import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';
import PopUp from 'components/popup/PopUp';
import React, { FC, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { friendType, UserType } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCurrentUser, userAction } from 'store/slice/userSlice';
import './friendpage.scss';

export interface FriendInfoProps {
  friend: friendType;
  user: UserType | null;
  onDelete: (friendId: string) => void;
}

const FriendInfo: FC<FriendInfoProps> = ({ friend, user, onDelete }) => {
  const currentUser = useAppSelector(selectCurrentUser);

  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleClosePopup = () => {
    setIsOpenPopup(false);
  };

  const handleDeleteFriend = () => {
    onDelete(friend._id);
    setIsOpenPopup(false);
  };
  return (
    <>
      <div className="friend-info">
        <Avatar src={friend.avatar} alt={friend.fullName} className="friend-info-avatar" />
        <div className="friend-info-name-and-status">
          <Link to={`/${friend.username}`}>
            <div className="friend-info-name">{friend.fullName}</div>
          </Link>
          <div className="friend-info-status">{friend.email}</div>
        </div>
        {currentUser?.username === user?.username && (
          <div className="friend-info-action" onClick={() => setIsOpenPopup(true)}>
            <button className="friend-info-action-delete">DELETE</button>
          </div>
        )}
      </div>

      <PopUp
        isOpen={isOpenPopup}
        onClose={handleClosePopup}
        onConfirm={handleDeleteFriend}
        type="friend"
      />
      <Backdrop isShow={isOpenPopup} setIsShow={setIsOpenPopup} color="#fff" opacity={0.5} />
    </>
  );
};

const FriendsPage = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentUser);
  const [isFetchingFriendsInfo, setIsFetchingFriendsInfo] = useState<boolean>(false);
  const [friendList, setFriendList] = useState<friendType[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getFriendProfile = async (username: string) => {
      try {
        const data: UserType = await getProfileOtherApi(username);
        setUser(data);
      } catch (error) {
        navigate('/404');
      }
    };
    // if currentUser different from params.username then we are in friend profile then get friend profile
    // else get current user profile from store
    if (params.username !== currentUser?.username) {
      getFriendProfile(params.username as string);
    } else {
      setUser(currentUser);
    }
  }, [params.username, currentUser, navigate]);

  useEffect(() => {
    const getFriendsInfo = async () => {
      setIsFetchingFriendsInfo(true);
      if (user) {
        const res = await getFriendListApi(user?._id, { page: 0 });
        setFriendList(res);
        setIsFetchingFriendsInfo(false);
      } else {
        setIsFetchingFriendsInfo(false);
        return;
      }
    };
    getFriendsInfo();
  }, [user]);

  const deleteFriendHandler = (friendId: string) => {
    dispatch(userAction.deleteFriendRequest({ id: currentUser!._id, friendId }));
    setFriendList((prev) => prev.filter((friend) => friend._id !== friendId));
  };
  return (
    <>
      <div className="friends">
        <div className="mainWrapper">
          <div className="friends-wrapper">
            <div className="friends-page-header">
              <h2>Friends</h2>
              <div className="friends-page-filter">
                <input type="text" placeholder="Search here..." />
                <AiOutlineSearch />
              </div>
            </div>
            <div className="friend-list">
              {isFetchingFriendsInfo && <SkeletonLoading type="friend" />}
              {friendList.length > 0 ? (
                friendList.map((friend) => (
                  <FriendInfo
                    key={friend._id}
                    friend={friend}
                    user={user}
                    onDelete={deleteFriendHandler}
                  />
                ))
              ) : (
                <p>No Friend</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withLayout(FriendsPage);
