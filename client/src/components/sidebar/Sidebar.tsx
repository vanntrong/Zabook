import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import './sidebar.scss';

interface sidebarProps {
  className?: string;
}

const Sidebar: FC<sidebarProps> = ({ className }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <div className={`sidebar ${className ? className : ''}`}>
      <div className="sidebar-menu">
        <h5>Menu</h5>
        <div className="sidebar-menu__list">
          <NavLink
            className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
            to="/"
          >
            <img src="/assets/images/home.png" alt="" />
            <span>News</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
            to="/messages"
          >
            <img src="/assets/images/message.png" alt="" />
            <span>Messages</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
            to={`/${currentUser?.username}/friends`}
          >
            <img src="/assets/images/friend.png" alt="" />
            <span>Friends</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
            to={`/${currentUser?.username}/groups`}
          >
            <img src="/assets/images/group.png" alt="" />
            <span>Groups</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
            to="/events"
          >
            <img src="/assets/images/event.png" alt="" />
            <span>Events</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => 'sidebar-menu__item ' + (isActive && 'active')}
            to={`/${currentUser?.username}`}
          >
            <img src="/assets/images/settings.png" alt="" />
            <span>Manage account</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
