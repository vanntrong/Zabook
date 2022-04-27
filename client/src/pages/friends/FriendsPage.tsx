import { Avatar } from '@mui/material';
import { getFriendListApi } from 'api/userApi';
import withLayout from 'components/layout/Layout';
import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';
import React, { FC, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { friendType, UserType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import './friendpage.scss';

export interface FriendInfoProps {
  friend: friendType;
  user: UserType | null;
}

const FriendInfo: FC<FriendInfoProps> = ({ friend, user }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <div className="friend-info">
      <Avatar src={friend.avatar} alt={friend.fullName} className="friend-info-avatar" />
      <div className="friend-info-name-and-status">
        <Link to={`/${friend.username}`}>
          <div className="friend-info-name">{friend.fullName}</div>
        </Link>
        <div className="friend-info-status">{friend.email}</div>
      </div>
      {currentUser?.username === user?.username && (
        <div className="friend-info-action">
          <button className="friend-info-action-delete">DELETE</button>
        </div>
      )}
    </div>
  );
};

const FriendsPage = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const params = useParams();
  const currentUser = useAppSelector(selectCurrentUser);
  const [isFetchingFriendsInfo, setIsFetchingFriendsInfo] = useState<boolean>(false);
  const [friendList, setFriendList] = useState<friendType[]>([]);

  useEffect(() => {
    if (params.username !== currentUser?.username) {
      setUser(null);
    } else {
      setUser(currentUser);
      setIsFetchingFriendsInfo(false);
    }
  }, [params.username, currentUser]);
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
                  <FriendInfo key={friend._id} friend={friend} user={user} />
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
