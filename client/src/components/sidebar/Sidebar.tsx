import Logo from 'components/navbar/Logo';
import React, { FC } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

import './sidebar.scss';
interface sidebarProps {
  className?: string;
}

const Sidebar: FC<sidebarProps> = ({ className }) => {
  return (
    <div className={`sidebar ${className}`}>
      <div className="logo">
        <Logo />
      </div>
      <div className="sidebar-menu">
        <h5>Menu</h5>
        <div className="sidebar-menu__list">
          <div className="sidebar-menu__item">
            <HomeOutlinedIcon className="menu-icon" />
            <span>News</span>
          </div>
          <div className="sidebar-menu__item">
            <MessageOutlinedIcon className="menu-icon" />
            <span>Messages</span>
          </div>
          <div className="sidebar-menu__item">
            <PersonOutlineOutlinedIcon className="menu-icon" />
            <span>Friends</span>
          </div>
          <div className="sidebar-menu__item">
            <PeopleAltOutlinedIcon className="menu-icon" />
            <span>Communities</span>
          </div>
          <div className="sidebar-menu__item">
            <EventOutlinedIcon className="menu-icon" />
            <span>Events</span>
          </div>
          <div className="sidebar-menu__item">
            <ManageAccountsOutlinedIcon className="menu-icon" />
            <span>Manage account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
