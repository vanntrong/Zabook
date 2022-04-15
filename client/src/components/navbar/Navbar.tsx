import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PhotoIcon from '@mui/icons-material/Photo';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import Backdrop from 'components/Backdrop';
import SearchResultModal from 'components/searchResultModal/SearchResultModal';
import React, { FC, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import Logo from './Logo';
import './navbar.scss';

interface NavbarProps {
  className?: string;
}

const Navbar: FC<NavbarProps> = ({ className }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isShowSearchBox, setIsShowSearchBox] = useState<boolean>(false);
  return (
    <div className={`navbar ${className ? className : ''}`}>
      <div className="navbar-search">
        <Link className="navbar-logo" to="/">
          <Logo />
        </Link>
        <div className="navbar-search__box">
          <SearchIcon htmlColor="#666" />
          <input type="text" placeholder="Search..." onClick={() => setIsShowSearchBox(true)} />
          {isShowSearchBox && <SearchResultModal handleClose={setIsShowSearchBox} />}
        </div>
        <Backdrop
          isShow={isShowSearchBox}
          setIsShow={setIsShowSearchBox}
          color="#fff"
          opacity={0}
        />
      </div>
      <div className="navbar-list">
        <NavLink className={({ isActive }) => 'navbar-item ' + (isActive && 'active')} to="/">
          <HomeIcon fontSize="large" className="navbar-icon" />
          <div className="navbar-item__name">Home</div>
        </NavLink>
        <NavLink
          className={({ isActive }) => 'navbar-item ' + (isActive && 'active')}
          to={`/${currentUser?.username}/photos`}
        >
          <PhotoIcon fontSize="large" className="navbar-icon" />
          <div className="navbar-item__name">Photos</div>
        </NavLink>
        <NavLink
          className={({ isActive }) => 'navbar-item ' + (isActive && 'active')}
          to={`/${currentUser?.username}/videos`}
        >
          <OndemandVideoIcon fontSize="large" className="navbar-icon" />
          <div className="navbar-item__name">Videos</div>
        </NavLink>
        <NavLink
          className={({ isActive }) => 'navbar-item ' + (isActive && 'active')}
          to={`/${currentUser?.username}/groups`}
        >
          <GroupIcon fontSize="large" className="navbar-icon" />
          <div className="navbar-item__name">Groups</div>
        </NavLink>
        <NavLink
          className={({ isActive }) => 'navbar-item ' + (isActive && 'active')}
          to={`/${currentUser?.username}/favorites`}
        >
          <FavoriteIcon fontSize="large" className="navbar-icon" />
          <div className="navbar-item__name">Favorites</div>
        </NavLink>
      </div>
      <div className="navbar-user">
        <Link className="navbar-user__info" to={`/${currentUser?.username}`}>
          <Avatar src={currentUser?.avatar} alt="" sx={{ width: 35, height: 35 }} />
          <span>{currentUser?.lastName}</span>
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
