import { Avatar } from '@mui/material';
import Backdrop from 'components/backdrop/Backdrop';
import SearchResultModal from 'components/modal/searchResultModal/SearchResultModal';
import React, { FC, useState } from 'react';
import { AiOutlineClose, AiOutlineHome, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { BiMessage, BiMessageRoundedDots } from 'react-icons/bi';
import { BsCameraVideo, BsLightningCharge, BsPerson } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
// import { AiOutlineClose } from "react-icons/ai";
import { IoNotificationsOutline } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import './navbar.scss';

interface NavbarProps {
  className?: string;
}

const Navbar: FC<NavbarProps> = ({ className }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isShowSearchBox, setIsShowSearchBox] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [isMobileSideBarShow, setIsMobileSideBarShow] = useState<boolean>(false);

  const clickShowMenuMobileHandler = () => {
    if (!isMobileSideBarShow) {
      document.querySelector('.sidebar')?.classList.remove('hide');
      document.querySelector('.sidebar')?.classList.add('show');
    } else {
      document.querySelector('.sidebar')?.classList.remove('show');
      document.querySelector('.sidebar')?.classList.add('hide');
    }
    setIsMobileSideBarShow(!isMobileSideBarShow);
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        <h2>Sociala.</h2>
      </Link>
      <div className="navbar-navigate">
        <div className="navbar-navigate-item">
          <BiMessageRoundedDots className="navbar-navigate-item-icon" />
        </div>
        <div className="navbar-navigate-item">
          <BsCameraVideo className="navbar-navigate-item-icon" />
        </div>
        <div className="navbar-navigate-item">
          <AiOutlineSearch className="navbar-navigate-item-icon" />
        </div>
        <div className="navbar-menu" onClick={clickShowMenuMobileHandler}>
          {!isMobileSideBarShow && <AiOutlineMenu />}
          {isMobileSideBarShow && <AiOutlineClose />}
        </div>
      </div>
      <div className="navbar-center-desktop">
        <div className="navbar-search-desktop">
          <AiOutlineSearch className="navbar-search-desktop-icon" />
          <input
            type="text"
            value={searchText || ''}
            placeholder="Start typing to search..."
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsShowSearchBox(true)}
            onBlur={() => {
              // setIsShowSearchBox(false);
              setSearchText('');
            }}
          />
          {isShowSearchBox && (
            <SearchResultModal handleClose={setIsShowSearchBox} searchText={searchText} />
          )}
          <Backdrop isShow={isShowSearchBox} setIsShow={setIsShowSearchBox} color="#fff" />
        </div>
        <div className="navbar-navlink">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'navbar-navlink-item active' : 'navbar-navlink-item'
            }
          >
            <AiOutlineHome className="navbar-navlink-icon" />
          </NavLink>

          <NavLink
            to="/stories"
            className={({ isActive }) =>
              isActive ? 'navbar-navlink-item active' : 'navbar-navlink-item'
            }
          >
            <BsLightningCharge className="navbar-navlink-icon" />
          </NavLink>
          <NavLink
            to={`/${currentUser?.username}`}
            className={({ isActive }) =>
              isActive ? 'navbar-navlink-item active' : 'navbar-navlink-item'
            }
          >
            <BsPerson className="navbar-navlink-icon" />
          </NavLink>
        </div>
      </div>

      <div className="navbar-navigate-desktop">
        <div className="navbar-navigate-item">
          <IoNotificationsOutline className="navbar-navigate-item-icon" />
        </div>
        <Link to="/messages" className="navbar-navigate-item">
          <BiMessage className="navbar-navigate-item-icon" />
        </Link>
        <div className="navbar-navigate-item navbar-navigate-item-setting">
          <FiSettings className="navbar-navigate-item-icon icon-rotate" />
          <div className="setting-app-box"></div>
        </div>
        <Link to="/settings" className="navbar-user">
          <Avatar src={currentUser?.avatar} className="navbar-user-avatar" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
