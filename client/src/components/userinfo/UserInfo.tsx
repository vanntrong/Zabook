import React, { FC, useState } from 'react';
import { Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message';
import EditIcon from '@mui/icons-material/Edit';
import AvatarGroup from '@mui/material/AvatarGroup';

import './userinfo.scss';
import { UserType } from 'shared/types';
import ModalUpdateUser from './modalUpdateUser/ModalUpdateUser';
import Backdrop from 'components/Backdrop';

interface UserInfoProps {
  user: UserType | null;
  userNameParams?: string;
}

const UserInfo: FC<UserInfoProps> = ({ user, userNameParams }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  return (
    <>
      <div className="user-profile-wrapper">
        <div className="user-profile-info">
          <Avatar
            src={user?.avatar}
            alt={user?.username}
            sx={{ width: 173, height: 173 }}
            className="user-info-avatar"
          />
          <div>
            <h3>{user?.firstName + ' ' + user?.lastName}</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi sint doloribus totam
              quaerat. Molestias laboriosam possimus fugit at maiores, amet libero accusamus soluta
              ab quo quisquam nam earum numquam inventore!
            </p>
            <div className="profile-action profile-action-desktop">
              {userNameParams !== user?.username ? (
                <>
                  <button className="add-friend">Add Friend</button>
                  <button className="send-message">Send Message</button>
                </>
              ) : (
                <button className="update-info" onClick={() => setIsShowModal(true)}>
                  Update Info
                </button>
              )}
            </div>
            <AvatarGroup max={8} className="user-info-friend-group">
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt="Remy Sharp"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              />
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt="Travis Howard"
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              />
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt="Cindy Baker"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              />
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt="Agnes Walker"
                src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              />
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt="Trevor Henderson"
                src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              />
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt="Trevor Henderson"
                src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              />
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt="Trevor Henderson"
                src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              />
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt="Trevor Henderson"
                src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              />
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt="Trevor Henderson"
                src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              />
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt="Trevor Henderson"
                src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              />
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt="Trevor Henderson"
                src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              />
            </AvatarGroup>

            <div className="user-info profile-info-desktop">
              <div className="info-item">
                <h5>739k</h5>
                <span>Likes</span>
              </div>
              <div className="info-item">
                <h5>254k</h5>
                <span>Follower</span>
              </div>
              <div className="info-item">
                <h5>{user?.friends.length}</h5>
                <span>Friends</span>
              </div>
              <div className="info-item">
                <h5>{user?.posts?.length} 0</h5>
                <span>Posts</span>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-action profile-action-mobile">
          {userNameParams !== user?.username ? (
            <>
              <button className="add-friend">Add Friend</button>
              <button className="send-message">Send Message</button>
            </>
          ) : (
            <button className="update-info" onClick={() => setIsShowModal(true)}>
              Update Info
            </button>
          )}
        </div>
        <div className="user-info profile-info-mobile">
          <div className="info-item">
            <h5>739k</h5>
            <span>Likes</span>
          </div>
          <div className="info-item">
            <h5>254k</h5>
            <span>Follower</span>
          </div>
          <div className="info-item">
            <h5>{user?.friends.length}</h5>
            <span>Friends</span>
          </div>
          <div className="info-item">
            <h5>{user?.posts?.length} 0</h5>
            <span>Posts</span>
          </div>
        </div>

        <div className="user-profile-nav">
          <NavLink
            className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}
            end
            to={`/${user?.username}`}
          >
            <span>Posts</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}
            to={`/${user?.username}/info`}
          >
            <span>Information</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}
            to={`/${user?.username}/friends`}
          >
            <span>Friends</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}
            to={`/${user?.username}/photos`}
          >
            <span>Photos</span>
          </NavLink>
        </div>
      </div>
      {isShowModal && (
        <>
          <ModalUpdateUser handleClose={setIsShowModal} />
          <Backdrop isShow={isShowModal} setIsShow={setIsShowModal} color="#fff" />
        </>
      )}
    </>
  );
};

export default UserInfo;
