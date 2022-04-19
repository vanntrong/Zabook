import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import Backdrop from 'components/Backdrop';
import SearchResultModal from 'components/searchResultModal/SearchResultModal';
import React, { FC, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './Logo';
import './navbar.scss';

interface NavbarProps {
  className?: string;
}

const Navbar: FC<NavbarProps> = ({ className }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isShowSearchBox, setIsShowSearchBox] = useState<boolean>(false);
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-left-menu">
          <MenuIcon />
        </div>
        <div className="navbar-left-logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="navbar-search">
          <SearchIcon htmlColor="#ddd" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-right-list">
          <div className="navbar-right-item">
            <div className="navbar-upload">
              <Avatar sx={{ backgroundColor: '#eee' }} className="navbar-upload-icon">
                +
              </Avatar>
              <span>Upload</span>
            </div>
          </div>
          <div className="navbar-right-item">
            <img src="/assets/images/notification.png" alt="" className="navbar-right-item__img" />
          </div>
          <div className="navbar-right-item">
            <img src="/assets/images/message.png" alt="" className="navbar-right-item__img" />
          </div>
          <div className="navbar-right-item">
            <Link to={`/${currentUser?.username}`}>
              <Avatar src={currentUser?.avatar} alt={currentUser?.username} />
            </Link>
          </div>
        </div>
      </div>
    </div>

    // <div className={`navbar ${className ? className : ''}`}>
    //   <div className="navbar-search">
    //     <Link className="navbar-logo" to="/">
    //       <Logo />
    //     </Link>
    //     <div className="navbar-search__box">
    //       <SearchIcon htmlColor="#666" onClick={() => setIsShowSearchBox(true)} />
    //       <input type="text" placeholder="Search..." onClick={() => setIsShowSearchBox(true)} />
    //       {isShowSearchBox && <SearchResultModal handleClose={setIsShowSearchBox} />}
    //     </div>
    //     <Backdrop
    //       isShow={isShowSearchBox}
    //       setIsShow={setIsShowSearchBox}
    //       color="#fff"
    //       opacity={0}
    //     />
    //   </div>
    //   <div className="navbar-list">
    //     <NavLink className={({ isActive }) => 'navbar-item ' + (isActive && 'active')} to="/">
    //       <img src="/assets/images/home.png" alt="home" className="navbar-icon" />
    //       <div className="navbar-item__name">Home</div>
    //     </NavLink>
    //     <NavLink
    //       className={({ isActive }) => 'navbar-item ' + (isActive && 'active')}
    //       to={`/${currentUser?.username}/photos`}
    //     >
    //       <img src="/assets/images/photo.png" alt="" className="navbar-icon" />
    //       <div className="navbar-item__name">Photos</div>
    //     </NavLink>
    //     <NavLink
    //       className={({ isActive }) => 'navbar-item ' + (isActive && 'active')}
    //       to={`/${currentUser?.username}/videos`}
    //     >
    //       <img src="/assets/images/video.png" alt="" className="navbar-icon" />
    //       <div className="navbar-item__name">Videos</div>
    //     </NavLink>
    //     <NavLink
    //       className={({ isActive }) => 'navbar-item ' + (isActive && 'active')}
    //       to={`/${currentUser?.username}/groups`}
    //     >
    //       <img src="/assets/images/group.png" alt="" className="navbar-icon" />
    //       <div className="navbar-item__name">Groups</div>
    //     </NavLink>
    //     <NavLink
    //       className={({ isActive }) => 'navbar-item ' + (isActive && 'active')}
    //       to={`/${currentUser?.username}/favorites`}
    //     >
    //       <img src="/assets/images/lover.png" alt="" className="navbar-icon" />
    //       <div className="navbar-item__name">Favorites</div>
    //     </NavLink>
    //   </div>
    //   <div className="navbar-user">
    //     <Link className="navbar-user__info" to={`/${currentUser?.username}`}>
    //       <Avatar src={currentUser?.avatar} alt="" sx={{ width: 35, height: 35 }} />
    //       <span>{currentUser?.lastName}</span>
    //     </Link>
    //     <div className="navbar-user__action">
    //       <Link to="/messages">
    //         <Avatar className="action-item">
    //           <img src="/assets/images/message-small.png" alt="" className="action-item__icon" />
    //         </Avatar>
    //       </Link>
    //       <Avatar className="action-item">
    //         <img src="/assets/images/notification.png" alt="" />
    //       </Avatar>
    //       <Avatar className="action-item">
    //         <img src="/assets/images/arrow-down.png" alt="" className="action-item__icon" />
    //       </Avatar>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Navbar;
