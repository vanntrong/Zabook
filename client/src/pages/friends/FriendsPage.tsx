import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';
import UserInfo from 'components/userinfo/UserInfo';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { FC } from 'react';

import './friendpage.scss';

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
  return (
    <div className="friends">
      <Sidebar />
      <Navbar />
      <div className="friends-wrapper">
        <UserInfo />
        <div className="friend-list">
          <FriendInfo
            name="Elon Musk"
            avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            status="Space X"
          />
          <FriendInfo
            name="Elon Musk"
            avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            status="Space X"
          />
          <FriendInfo
            name="Elon Musk"
            avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            status="Space X"
          />
          <FriendInfo
            name="Elon Musk"
            avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            status="Space X"
          />
          <FriendInfo
            name="Elon Musk"
            avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            status="Space X"
          />
          <FriendInfo
            name="Elon Musk"
            avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            status="Space X"
          />
          <FriendInfo
            name="Elon Musk"
            avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            status="Space X"
          />
          <FriendInfo
            name="Elon Musk"
            avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            status="Space X"
          />
          <FriendInfo
            name="Elon Musk"
            avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            status="Space X"
          />
          <FriendInfo
            name="Elon Musk"
            avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            status="Space X"
          />
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
