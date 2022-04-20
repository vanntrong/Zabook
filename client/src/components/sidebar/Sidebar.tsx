import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCurrentUser, userAction } from 'store/slice/userSlice';
import CloseIcon from '@mui/icons-material/Close';
import './sidebar.scss';
import Logo from 'components/navbar/Logo';
import { Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import PeopleIcon from '@mui/icons-material/People';
import LandscapeIcon from '@mui/icons-material/Landscape';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

interface sidebarProps {
  className?: string;
}

const Sidebar: FC<sidebarProps> = ({ className }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(userAction.logoutUser());
  };

  const closeMenuMobileHandler = () => {
    document.querySelector('.sidebar')?.classList.remove('show');
    document.querySelector('.sidebar')?.classList.add('hide');
  };
  return (
    <div className={'sidebar ' + (className ? className : '')}>
      <div className="sidebar-top">
        <div className="sidebar-top-menu">
          <h3>Menu</h3>
          <div onClick={closeMenuMobileHandler}>
            <CloseIcon />
          </div>
        </div>
        <div className="sidebar-top-menu-desktop">
          <Link to="/">
            <Logo />
          </Link>
          <div onClick={closeMenuMobileHandler}>
            <CloseIcon />
          </div>
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
              <HomeIcon sx={{ width: 36, height: 36 }} />
              {/* <img src="/assets/images/home.png" alt="" /> */}
              <h4>Feed</h4>
            </NavLink>
          </div>
          <div className="sidebar-menu-item">
            <NavLink
              to="/search"
              className={({ isActive }) => 'sidebar-menu__link ' + (isActive && 'active')}
            >
              {/* <img src="/assets/images/search.png" alt="" /> */}
              <SearchIcon sx={{ width: 36, height: 36 }} />
              <h4>Explore</h4>
            </NavLink>
          </div>
          <div className="sidebar-menu-item">
            <NavLink
              to="/messages"
              className={({ isActive }) => 'sidebar-menu__link ' + (isActive && 'active')}
            >
              {/* <img src="/assets/images/message.png" alt="" /> */}
              <SendIcon sx={{ width: 36, height: 36 }} />
              <h4>Messages</h4>
            </NavLink>
          </div>
          <div className="sidebar-menu-item">
            <NavLink
              to={`/${currentUser!.username}/friends`}
              className={({ isActive }) => 'sidebar-menu__link ' + (isActive && 'active')}
            >
              {/* <img src="/assets/images/friend.png" alt="" /> */}
              <PeopleIcon sx={{ width: 36, height: 36 }} />
              <h4>Friends</h4>
            </NavLink>
          </div>
          <div className="sidebar-menu-item">
            <NavLink
              to={`/${currentUser!.username}/photos`}
              className={({ isActive }) => 'sidebar-menu__link ' + (isActive && 'active')}
            >
              {/* <img src="/assets/images/photo.png" alt="" /> */}
              <LandscapeIcon sx={{ width: 36, height: 36 }} />
              <h4>Photos</h4>
            </NavLink>
          </div>
          <div className="sidebar-menu-item">
            <NavLink
              to={`/${currentUser!.username}`}
              className={({ isActive }) => 'sidebar-menu__link ' + (isActive && 'active')}
            >
              {/* <img src="/assets/images/settings.png" alt="" />
               */}
              <PersonIcon sx={{ width: 36, height: 36 }} />
              <h4>Profile</h4>
            </NavLink>
          </div>
        </div>
        <hr />
        <div className="sidebar-logout">
          <button onClick={() => logoutHandler()}>
            {/* <img src="/assets/images/logout.png" alt="" /> */}
            <LogoutIcon sx={{ width: 36, height: 36 }} />
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
