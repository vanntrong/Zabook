import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import Backdrop from 'components/Backdrop';
import SearchResultModal from 'components/searchResultModal/SearchResultModal';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCurrentUser, userAction } from 'store/slice/userSlice';
import InputPostModal from './../input/InputPost/inputPostModal/InputPostModal';
import Logo from './Logo';
import './navbar.scss';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SendIcon from '@mui/icons-material/Send';

interface NavbarProps {
  className?: string;
}

const Navbar: FC<NavbarProps> = ({ className }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isShowSearchBox, setIsShowSearchBox] = useState<boolean>(false);
  const [isShowInputPostModal, setIsShowInputPostModal] = useState<boolean>(false);
  const [isShowModalUser, setIsShowModalUser] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(userAction.logoutUser());
  };

  const clickShowMenuMobileHandler = () => {
    document.querySelector('.sidebar')?.classList.remove('hide');
    document.querySelector('.sidebar')?.classList.add('show');
  };
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-left-menu" onClick={clickShowMenuMobileHandler}>
          <MenuIcon />
        </div>
        <div className="navbar-left-logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="navbar-search">
          <SearchIcon htmlColor="#ddd" />
          <input
            type="text"
            placeholder="Search..."
            onClick={() => setIsShowSearchBox(true)}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {isShowSearchBox && (
            <SearchResultModal handleClose={setIsShowSearchBox} searchText={searchText} />
          )}
        </div>
        <Backdrop
          isShow={isShowSearchBox}
          setIsShow={setIsShowSearchBox}
          color="#fff"
          opacity={0}
        />
      </div>
      <div className="navbar-right">
        <div className="navbar-right-list">
          <div className="navbar-right-item">
            <div className="navbar-upload" onClick={() => setIsShowInputPostModal(true)}>
              <Avatar sx={{ backgroundColor: '#eee' }} className="navbar-upload-icon">
                +
              </Avatar>
              <span>Upload</span>
            </div>
          </div>
          <div className="navbar-right-item">
            {/* <img src="/assets/images/notification.png" alt="" className="navbar-right-item__img" /> */}
            <NotificationsIcon className="navbar-right-item__img" />
          </div>
          <div className="navbar-right-item">
            <Link to="/messages" style={{ color: 'inherit' }}>
              {/* <img src="/assets/images/message.png" alt="" className="navbar-right-item__img" /> */}
              <SendIcon className="navbar-right-item__img" />
            </Link>
          </div>
          <div
            className="navbar-right-item"
            style={{ cursor: 'pointer', position: 'relative' }}
            onClick={() => setIsShowModalUser((prev) => !prev)}
          >
            <Avatar src={currentUser?.avatar} alt={currentUser?.username} />
            {isShowModalUser && (
              <div className="modal-user">
                <Link
                  to={`/${currentUser?.username}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="modal-user-item">View profile</div>
                </Link>
                <div className="modal-user-item" onClick={() => logoutHandler()}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isShowInputPostModal && (
        <InputPostModal currentUser={currentUser} setIsShowPostModal={setIsShowInputPostModal} />
      )}
      <Backdrop isShow={isShowInputPostModal} setIsShow={setIsShowInputPostModal} color="#fff" />
    </div>
  );
};

export default Navbar;
