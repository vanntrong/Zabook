import React, { FC } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { NavLink } from 'react-router-dom';

import './sidebar.scss';
interface sidebarProps {
  className?: string;
}

const Sidebar: FC<sidebarProps> = ({ className }) => {
  return (
    <div className={`sidebar ${className ? className : ''}`}>
      <div className="sidebar-menu">
        <h5>Menu</h5>
        <div className="sidebar-menu__list">
          <NavLink
            className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
            to="/"
          >
            <HomeOutlinedIcon className="menu-icon" />
            <span>News</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
            to="/messages"
          >
            <MessageOutlinedIcon className="menu-icon" />
            <span>Messages</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
            to="/:username/friends" // update username to match the username of the user
          >
            <PersonOutlineOutlinedIcon className="menu-icon" />
            <span>Friends</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
            to="/groups"
          >
            <PeopleAltOutlinedIcon className="menu-icon" />
            <span>Groups</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
            to="/events"
          >
            <EventOutlinedIcon className="menu-icon" />
            <span>Events</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
            to="/:username" // update username to match the username of the user
          >
            <ManageAccountsOutlinedIcon className="menu-icon" />
            <span>Manage account</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
