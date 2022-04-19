import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';
import UserInfo from 'components/userinfo/UserInfo';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { FC, useEffect, useState } from 'react';

import './friendpage.scss';
import { useParams } from 'react-router-dom';
import { UserType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import SkeletonLoading from 'components/SkeletonLoading';
import RightBar from 'components/rightbar/Rightbar';

interface FriendInfoProps {
  name: string;
  avatar: string;
  status?: string;
}

const FriendInfo: FC<FriendInfoProps> = ({ name, avatar, status }) => {
  return (
    <div className="friend-info">
      <div className="friend-info-avatar">
        <img src={avatar} alt={name} />
      </div>
      <div>
        <div className="friend-info-name">{name}</div>
        <div className="friend-info-status">{status}</div>
      </div>
      <div className="friend-info-action">
        <MoreHorizIcon />
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
      <Navbar />
      <Sidebar />
      <div className="friends">
        <div className="friends-wrapper">
          {user && <UserInfo user={user} />}
          <div className="friend-list">
            {isFetchingFriendsInfo && <SkeletonLoading type="friend" />}
            {isFetchingFriendsInfo && <SkeletonLoading type="friend" />}
            {isFetchingFriendsInfo && <SkeletonLoading type="friend" />}
            {isFetchingFriendsInfo && <SkeletonLoading type="friend" />}
            {/* {!isFetchingFriendsInfo && user && user?.friends.length > 0 && user?.friends.map((friend)) => (
              <FriendInfo />
            } */}
          </div>
        </div>
        <RightBar className="friends-rightbar" />
      </div>
    </>
  );
};

export default FriendsPage;
