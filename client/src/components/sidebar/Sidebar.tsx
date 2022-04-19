import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import CloseIcon from '@mui/icons-material/Close';
import './sidebar.scss';
import Logo from 'components/navbar/Logo';
import { Avatar } from '@mui/material';

interface sidebarProps {
  className?: string;
}

const Sidebar: FC<sidebarProps> = ({ className }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-top-menu">
          <h3>Menu</h3>
          <CloseIcon />
        </div>
        <div className="sidebar-top-menu-desktop">
          <Link to="/">
            <Logo />
          </Link>
          <button className="toggle-darkmode">
            <img src="/assets/images/sun.png" alt="" />
          </button>
        </div>
        <hr />
        <div className="sidebar-user">
          <Avatar src={currentUser?.avatar} className="sidebar-user-avatar" />
          <div className="sidebar-user-name">
            <h3>{currentUser?.fullName}</h3>
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-info-item">
              <h3>Post</h3>
              {/* will fix current user posts soon */}
              <span>{currentUser?.posts?.length}0</span>
            </div>
            <div className="sidebar-user-info-item">
              <h3>Following</h3>
              <span>{currentUser?.friends.length}</span>
            </div>
            <div className="sidebar-user-info-item">
              <h3>Followers</h3>
              <span>{currentUser?.friends.length}</span>
            </div>
          </div>
        </div>
        <div className="sidebar-menu-list">
          <div className="sidebar-menu-item">
            <NavLink
              to="/"
              className={({ isActive }) => 'sidebar-menu__link ' + (isActive && 'active')}
            >
              <img src="/assets/images/home.png" alt="" />
              <h4>Feed</h4>
            </NavLink>
          </div>
          <div className="sidebar-menu-item">
            <NavLink
              to="/search"
              className={({ isActive }) => 'sidebar-menu__link ' + (isActive && 'active')}
            >
              <img src="/assets/images/search.png" alt="" />
              <h4>Explore</h4>
            </NavLink>
          </div>
          <div className="sidebar-menu-item">
            <NavLink
              to="/messages"
              className={({ isActive }) => 'sidebar-menu__link ' + (isActive && 'active')}
            >
              <img src="/assets/images/message.png" alt="" />
              <h4>Messages</h4>
            </NavLink>
          </div>
          <div className="sidebar-menu-item">
            <NavLink
              to={`/${currentUser!.username}/friends`}
              className={({ isActive }) => 'sidebar-menu__link ' + (isActive && 'active')}
            >
              <img src="/assets/images/friend.png" alt="" />
              <h4>Friends</h4>
            </NavLink>
          </div>
          <div className="sidebar-menu-item">
            <NavLink
              to={`/${currentUser!.username}/photos`}
              className={({ isActive }) => 'sidebar-menu__link ' + (isActive && 'active')}
            >
              <img src="/assets/images/photo.png" alt="" />
              <h4>Photos</h4>
            </NavLink>
          </div>
          <div className="sidebar-menu-item">
            <NavLink
              to={`/${currentUser!.username}/setting`}
              className={({ isActive }) => 'sidebar-menu__link ' + (isActive && 'active')}
            >
              <img src="/assets/images/settings.png" alt="" />
              <h4>Setting</h4>
            </NavLink>
          </div>
        </div>
        <hr />
        <div className="sidebar-logout">
          <button>
            <img src="/assets/images/logout.png" alt="" />
            <h4>Logout</h4>
          </button>
        </div>
      </div>
    </div>
    // <div className={`sidebar ${className ? className : ''}`}>
    //   <div className="sidebar-menu">
    //     <h5>Menu</h5>
    //     <div className="sidebar-menu__list">
    //       <NavLink
    //         className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
    //         to="/"
    //       >
    //         <img src="/assets/images/home.png" alt="" />
    //         <span>News</span>
    //       </NavLink>
    //       <NavLink
    //         className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
    //         to="/messages"
    //       >
    //         <img src="/assets/images/message.png" alt="" />
    //         <span>Messages</span>
    //       </NavLink>
    //       <NavLink
    //         className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
    //         to={`/${currentUser?.username}/friends`}
    //       >
    //         <img src="/assets/images/friend.png" alt="" />
    //         <span>Friends</span>
    //       </NavLink>
    //       <NavLink
    //         className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
    //         to={`/${currentUser?.username}/groups`}
    //       >
    //         <img src="/assets/images/group.png" alt="" />
    //         <span>Groups</span>
    //       </NavLink>
    //       <NavLink
    //         className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
    //         to="/events"
    //       >
    //         <img src="/assets/images/event.png" alt="" />
    //         <span>Events</span>
    //       </NavLink>
    //       <NavLink
    //         className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
    //         to={`/${currentUser?.username}`}
    //       >
    //         <img src="/assets/images/settings.png" alt="" />
    //         <span>Manage account</span>
    //       </NavLink>
    //     </div>
    //   </div>
    //   <hr />
    // </div>
  );
};

export default Sidebar;
