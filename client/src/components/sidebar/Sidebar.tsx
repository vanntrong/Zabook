import React, { FC } from 'react';
import { BiBadgeCheck, BiGroup, BiNews } from 'react-icons/bi';
import { BsChatLeft, BsHouseDoor, BsLightningCharge, BsPerson } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { HiOutlineMail } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCurrentUser, userAction } from 'store/slice/userSlice';
import { FiLogOut } from 'react-icons/fi';
import './sidebar.scss';
import { Link } from 'react-router-dom';

interface sidebarProps {
  className?: string;
}

const Sidebar: FC<sidebarProps> = ({ className }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(userAction.logoutUser());
  };

  return (
    <div className="sidebar">
      <div className="sidebar-list">
        <h4 className="sidebar-title">New Feeds</h4>
        <Link to="/" className="sidebar-item">
          <div className="sidebar-item-icon bg-icon-1">
            <BiNews />
          </div>
          <span>Newsfeed</span>
        </Link>
        <Link to="/badges" className="sidebar-item">
          <div className="sidebar-item-icon bg-icon-2">
            <BiBadgeCheck />
          </div>
          <span>Badges</span>
        </Link>
        <Link to="/stories" className="sidebar-item">
          <div className="sidebar-item-icon bg-icon-3">
            <BsLightningCharge />
          </div>
          <span>Explore Stories</span>
        </Link>
        <Link to="/groups" className="sidebar-item">
          <div className="sidebar-item-icon bg-icon-4">
            <BiGroup />
          </div>
          <span>Popular Groups</span>
        </Link>
        <Link to={`/${currentUser?.username}`} className="sidebar-item">
          <div className="sidebar-item-icon bg-icon-5">
            <BsPerson />
          </div>
          <span>Author Profile</span>
        </Link>
      </div>
      <div className="sidebar-list">
        <h4 className="sidebar-title">More Pages</h4>
        <div className="sidebar-item">
          <div className="sidebar-item-icon sidebar-icon-2">
            <HiOutlineMail />
          </div>
          <span>Email Box</span>
        </div>
        <div className="sidebar-item">
          <div className="sidebar-item-icon sidebar-icon-2">
            <BsHouseDoor />
          </div>
          <span>Near Hotel</span>
        </div>
        <div className="sidebar-item">
          <div className="sidebar-item-icon sidebar-icon-2">
            <GoLocation />
          </div>
          <span>Latest Event</span>
        </div>
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
