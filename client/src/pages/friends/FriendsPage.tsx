import { Avatar } from '@mui/material';
import withLayout from 'components/layout/Layout';
import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';
import React, { FC, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { UserType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import './friendpage.scss';

interface FriendInfoProps {
  name?: string;
  avatar?: string;
  status?: string;
}

const FriendInfo: FC<FriendInfoProps> = ({ name, avatar, status }) => {
  return (
    <div className="friend-info">
      <Avatar
        src="http://uitheme.net/sociala/images/user-7.png"
        alt=""
        className="friend-info-avatar"
      />
      <div className="friend-info-name-and-status">
        <div className="friend-info-name">Victor Exrixon</div>
        <div className="friend-info-status">@macale343</div>
      </div>
      <div className="friend-info-action">
        <button className="friend-info-action-delete">DELETE</button>
      </div>
    </div>
  );
};

const FriendsPage = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const params = useParams();
  const currentUser = useAppSelector(selectCurrentUser);
  const [isFetchingFriendsInfo, setIsFetchingFriendsInfo] = useState<boolean>(true);

  useEffect(() => {
    if (params.username !== currentUser?.username) {
      setUser(null);
    } else {
      setUser(currentUser);
      setIsFetchingFriendsInfo(false);
    }
  }, [params.username, currentUser]);
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
              {isFetchingFriendsInfo && <SkeletonLoading type="friend" />}
              {isFetchingFriendsInfo && <SkeletonLoading type="friend" />}
              {isFetchingFriendsInfo && <SkeletonLoading type="friend" />}
              <FriendInfo />
              <FriendInfo />
              <FriendInfo />
              <FriendInfo />
              <FriendInfo />
              <FriendInfo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withLayout(FriendsPage);
