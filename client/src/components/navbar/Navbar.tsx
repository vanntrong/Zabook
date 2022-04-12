import React, { FC } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PhotoIcon from '@mui/icons-material/Photo';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import GroupIcon from '@mui/icons-material/Group';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import Logo from './Logo';
import { NavLink, Link } from 'react-router-dom';

import './navbar.scss';
import { Avatar } from '@mui/material';
interface NavbarProps {
  className?: string;
}

const Navbar: FC<NavbarProps> = ({ className }) => {
  return (
    <div className={`navbar ${className ? className : ''}`}>
      <div className="navbar-search">
        <Link className="navbar-logo" to="/">
          <Logo />
        </Link>
        <div className="navbar-search__box">
          <SearchIcon htmlColor="#666" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="navbar-list">
        <NavLink className={({ isActive }) => 'navbar-item ' + (isActive && 'active')} to="/">
          <HomeIcon fontSize="large" className="navbar-icon" />
          <div className="navbar-item__name">Home</div>
        </NavLink>
        <NavLink className={({ isActive }) => 'navbar-item ' + (isActive && 'active')} to="photos">
          <PhotoIcon fontSize="large" className="navbar-icon" />
          <div className="navbar-item__name">Photos</div>
        </NavLink>
        <NavLink className={({ isActive }) => 'navbar-item ' + (isActive && 'active')} to="videos">
          <OndemandVideoIcon fontSize="large" className="navbar-icon" />
          <div className="navbar-item__name">Videos</div>
        </NavLink>
        <NavLink className={({ isActive }) => 'navbar-item ' + (isActive && 'active')} to="/groups">
          <GroupIcon fontSize="large" className="navbar-icon" />
          <div className="navbar-item__name">Groups</div>
        </NavLink>
        <NavLink
          className={({ isActive }) => 'navbar-item ' + (isActive && 'active')}
          to="/favorites"
        >
          <FavoriteIcon fontSize="large" className="navbar-icon" />
          <div className="navbar-item__name">Favorites</div>
        </NavLink>
      </div>
      <div className="navbar-user">
        <Link className="navbar-user__info" to="/:username">
          <Avatar
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
            sx={{ width: 35, height: 35 }}
          />
          <span>Jacky</span>
        </Link>
        <div className="navbar-user__action">
          <Link to="/messages">
            <Avatar className="action-item">
              <ChatIcon className="action-item__icon" />
            </Avatar>
          </Link>
          <Avatar className="action-item">
            <NotificationsIcon className="action-item__icon" />
          </Avatar>
          <Avatar className="action-item">
            <ArrowDropDownRoundedIcon
              sx={{ width: 50, height: 50 }}
              className="action-item__icon"
            />
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
