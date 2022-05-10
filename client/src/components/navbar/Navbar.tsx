import { Avatar } from '@mui/material';
import Backdrop from 'components/backdrop/Backdrop';
import SearchResultModal from 'components/modal/searchResultModal/SearchResultModal';
import Notifications from 'components/notifications/Notifications';
import React, { FC, useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineHome, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { BiMessage, BiMessageRoundedDots } from 'react-icons/bi';
import { BsCameraVideo, BsLightningCharge, BsPerson } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
// import { AiOutlineClose } from "react-icons/ai";
import { IoNotificationsOutline } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import { notificationType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import './navbar.scss';
import { getAllNotificationApi } from '../../api/notificationApi';
import { toast } from 'react-toastify';
import { socket } from 'utils/socket';
import { selectTheme } from 'store/slice/themeSlice';
import { IoArrowBackSharp } from 'react-icons/io5';

interface NavbarProps {
  className?: string;
}

const Navbar: FC<NavbarProps> = ({ className }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isShowSearchBox, setIsShowSearchBox] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [isMobileSideBarShow, setIsMobileSideBarShow] = useState<boolean>(false);
  const [isShowNotifications, setIsShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<notificationType[]>([]);
  const [unSeenNotifications, setUnSeenNotifications] = useState<notificationType[]>([]);
  const [isShowSearchBoxMobile, setIsShowSearchBoxMobile] = useState<boolean>(false);
  const isDarkMode = useAppSelector(selectTheme);

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

  useEffect(() => {
    const getAllNotification = async () => {
      try {
        const res = await getAllNotificationApi();
        setNotifications(res);
        setUnSeenNotifications(res.filter((notify) => !notify.isRead));
      } catch (error) {
        toast.error(error.response.data);
      }
    };
    getAllNotification();
  }, []);

  useEffect(() => {
    socket.on('get-notification', (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      if (!notification.isRead) {
        setUnSeenNotifications((prev) => [notification, ...prev]);
      }
    });
  }, []);

  console.log(isShowSearchBox);

  return (
    <div className={`navbar ${isDarkMode ? 'dark' : ''}`}>
      {!isShowSearchBoxMobile && (
        <Link to="/" className="logo">
          <h2>Sociala.</h2>
        </Link>
      )}
      <div className="navbar-navigate">
        {!isShowSearchBoxMobile && (
          <div
            className="navbar-navigate-item"
            onClick={() => {
              setIsShowSearchBox(!isShowSearchBox);
              setIsShowSearchBoxMobile(true);
            }}
          >
            <AiOutlineSearch className="navbar-navigate-item-icon" />
          </div>
        )}

        {isShowSearchBox && (
          <SearchResultModal handleClose={setIsShowSearchBox} searchText={searchText} />
        )}

        {isShowSearchBoxMobile && (
          <div className="input-search-mobile">
            <div
              className="input-search-mobile-icon"
              onClick={() => {
                setIsShowSearchBox(!isShowSearchBox);
                setIsShowSearchBoxMobile(false);
              }}
            >
              <IoArrowBackSharp />
            </div>
            <input
              type="text"
              autoFocus
              placeholder="Start typing to search..."
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        )}

        {!isShowSearchBoxMobile && (
          <Link to="/messages">
            <div className="navbar-navigate-item">
              <BiMessageRoundedDots className="navbar-navigate-item-icon" />
            </div>
          </Link>
        )}
        {!isShowSearchBoxMobile && (
          <div
            className="navbar-navigate-item"
            style={{ position: 'relative' }}
            onClick={() => setIsShowNotifications((prev) => !prev)}
          >
            <IoNotificationsOutline className="navbar-navigate-item-icon" />
            {unSeenNotifications.length > 0 && (
              <div className="notification-count">
                <span>{unSeenNotifications.length}</span>
              </div>
            )}
            {isShowNotifications && (
              <Notifications
                notifications={notifications}
                setNotifications={setNotifications}
                unSeenNotifications={unSeenNotifications}
              />
            )}
          </div>
        )}

        {!isShowSearchBoxMobile && (
          <div className="navbar-menu" onClick={clickShowMenuMobileHandler}>
            {!isMobileSideBarShow && <AiOutlineMenu />}
            {isMobileSideBarShow && <AiOutlineClose />}
          </div>
        )}
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
        <div
          className="navbar-navigate-item"
          style={{ position: 'relative' }}
          onClick={() => setIsShowNotifications((prev) => !prev)}
        >
          <IoNotificationsOutline className="navbar-navigate-item-icon" />
          {unSeenNotifications.length > 0 && (
            <div className="notification-count">
              <span>{unSeenNotifications.length}</span>
            </div>
          )}
          {isShowNotifications && (
            <Notifications
              notifications={notifications}
              setNotifications={setNotifications}
              unSeenNotifications={unSeenNotifications}
            />
          )}
        </div>
        <Link to="/messages" className="navbar-navigate-item">
          <BiMessage className="navbar-navigate-item-icon" />
        </Link>
        <Link to="/settings">
          <div className="navbar-navigate-item navbar-navigate-item-setting">
            <FiSettings className="navbar-navigate-item-icon icon-rotate" />
            <div className="setting-app-box"></div>
          </div>
        </Link>
        <Link to={`/${currentUser?.username}`} className="navbar-user">
          <Avatar src={currentUser?.avatar} className="navbar-user-avatar" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
