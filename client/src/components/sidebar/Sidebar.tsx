import React, { FC } from 'react';
import { BiNews } from 'react-icons/bi';
import { BsChatLeft, BsLightningCharge, BsPerson } from 'react-icons/bs';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import { selectCurrentUser, userAction } from 'store/slice/userSlice';
import './sidebar.scss';

interface sidebarProps {
  className?: string;
}

const Sidebar: FC<sidebarProps> = ({ className }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(selectTheme);

  const logoutHandler = () => {
    dispatch(userAction.logoutUser());
  };

  return (
    <div className={`sidebar ${isDarkMode ? 'dark' : ''}`}>
      <div className="sidebar-list">
        <h4 className="sidebar-title">New Feeds</h4>
        <Link to="/" className="sidebar-item">
          <div className="sidebar-item-icon bg-icon-1">
            <BiNews />
          </div>
          <span>Newsfeed</span>
        </Link>
        {/* <Link to="/badges" className="sidebar-item">
          <div className="sidebar-item-icon bg-icon-2">
            <BiBadgeCheck />
          </div>
          <span>Badges</span>
        </Link> */}
        <Link to="/stories" className="sidebar-item">
          <div className="sidebar-item-icon bg-icon-3">
            <BsLightningCharge />
          </div>
          <span>Explore Stories</span>
        </Link>
        {/* <Link to="/groups" className="sidebar-item">
          <div className="sidebar-item-icon bg-icon-4">
            <BiGroup />
          </div>
          <span>Popular Groups</span>
        </Link> */}
        <Link to={`/${currentUser?.username}`} className="sidebar-item">
          <div className="sidebar-item-icon bg-icon-5">
            <BsPerson />
          </div>
          <span>Author Profile</span>
        </Link>
      </div>
      <div className="sidebar-list">
        <h4 className="sidebar-title">Account</h4>
        <Link to="/messages" className="sidebar-item">
          <div className="sidebar-item-icon sidebar-icon-3">
            <BsChatLeft />
          </div>
          <span>Chat</span>
        </Link>
        <Link to="/settings" className="sidebar-item">
          <div className="sidebar-item-icon sidebar-icon-3">
            <FiSettings />
          </div>
          <span>Settings</span>
        </Link>
        <div className="sidebar-item" onClick={logoutHandler}>
          <div className="sidebar-item-icon sidebar-icon-3">
            <FiLogOut />
          </div>
          <span>Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
