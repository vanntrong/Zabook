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
import InfiniteScroll from 'react-infinite-scroll-component';
import './friendpage.scss';
import { selectTheme } from 'store/slice/themeSlice';

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
  const isDarkMode = useAppSelector(selectTheme);
  const [isFetchingFriendsInfo, setIsFetchingFriendsInfo] = useState<boolean>(false);
  const [friendList, setFriendList] = useState<friendType[]>([]);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

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
    if (params.username !== currentUser?.username) {
      getFriendProfile(params.username as string);
    } else {
      setUser(currentUser); // else get current user profile from store
    }
  }, [params.username, currentUser, navigate]);

  useEffect(() => {
    const getFriendsInfo = async () => {
      setIsFetchingFriendsInfo(true);
      if (user) {
        const res = await getFriendListApi(user?._id, { page });
        // if res.data.length === 0 then we don't have more friends
        if (res.length === 0) {
          // set hasMore to false to stop infinite scroll
          setHasMore(false);
          // set isFetchingFriendsInfo to false to stop loading
          setIsFetchingFriendsInfo(false);
          return;
        }
        // set friendList to res
        setFriendList((prev) => [...prev, ...res]);
      }
      setIsFetchingFriendsInfo(false);
    };
    getFriendsInfo();
  }, [user, page]);

  const deleteFriendHandler = (friendId: string) => {
    dispatch(userAction.deleteFriendRequest({ id: currentUser!._id, friendId }));
    setFriendList((prev) => prev.filter((friend) => friend._id !== friendId));
  };
  return (
    <>
      <div className={`friends ${isDarkMode ? 'dark' : ''}`}>
        <div className="mainWrapper">
          <div className="friends-wrapper">
            <div className="friends-page-header">
              <h2>Friends</h2>
              <div className="friends-page-filter">
                <input type="text" placeholder="Search here..." />
                <AiOutlineSearch />
              </div>
            </div>
            <InfiniteScroll
              dataLength={friendList.length}
              hasMore={hasMore}
              next={() => setPage((prev) => prev + 1)}
              loader={null}
              endMessage={
                <p style={{ textAlign: 'center', marginTop: '10px' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              style={{ overflow: 'hidden' }}
            >
              <div className="friend-list">
                {isFetchingFriendsInfo && <SkeletonLoading type="friend" />}
                {!isFetchingFriendsInfo &&
                  friendList.length > 0 &&
                  friendList.map((friend) => (
                    <FriendInfo
                      key={friend._id}
                      friend={friend}
                      user={user}
                      onDelete={deleteFriendHandler}
                    />
                  ))}
                {!isFetchingFriendsInfo && friendList.length === 0 && <p>No Friend</p>}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
};

export default withLayout(FriendsPage);
