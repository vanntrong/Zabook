import React from 'react';
import { Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message';
import EditIcon from '@mui/icons-material/Edit';

import './userinfo.scss';

const UserInfo = () => {
  return (
    <div className="user-profile-wrapper">
      <div className="user-profile-info">
        <Avatar
          src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
          sx={{ width: 173, height: 173 }}
        />
        <h3>Jacky John</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi sint doloribus totam
          quaerat. Molestias laboriosam possimus fugit at maiores, amet libero accusamus soluta ab
          quo quisquam nam earum numquam inventore!
        </p>
        <div className="user-profile-nav">
          <NavLink
            className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}
            to="/:username"
          >
            <span>Posts</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}
            to="/:username/info"
          >
            <span>Information</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}
            to="/:username/friends"
          >
            <span>Friends</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}
            to="/:username/photos"
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
        <EditIcon />
      </div>
    </div>
  );
};

export default UserInfo;
