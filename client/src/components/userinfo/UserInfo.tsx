import React, { FC, useState } from 'react';
import { Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message';
import EditIcon from '@mui/icons-material/Edit';

import './userinfo.scss';
import { UserType } from 'shared/types';
import ModalUpdateUser from './modalUpdateUser/ModalUpdateUser';
import Backdrop from 'components/Backdrop';

interface UserInfoProps {
  user: UserType | null;
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  return (
    <>
      <div className="user-profile-wrapper">
        <div className="user-profile-info">
          <Avatar src={user?.avatar} alt={user?.username} sx={{ width: 173, height: 173 }} />
          <h3>{user?.firstName + ' ' + user?.lastName}</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi sint doloribus totam
            quaerat. Molestias laboriosam possimus fugit at maiores, amet libero accusamus soluta ab
            quo quisquam nam earum numquam inventore!
          </p>
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
        <div className="user-profile-edit">
          <NavLink to="/messages">
            <div className="user-profile-icon">
              <MessageIcon />
            </div>
          </NavLink>
          <div
            className="edit-icon"
            onClick={() => setIsShowModal(true)}
            style={{ cursor: 'pointer' }}
          >
            <EditIcon />
          </div>
        </div>
      </div>
      {isShowModal && (
        <>
          <ModalUpdateUser />
          <Backdrop isShow={isShowModal} setIsShow={setIsShowModal} color="#fff" />
        </>
      )}
    </>
  );
};

export default UserInfo;
