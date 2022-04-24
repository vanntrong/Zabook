import { Avatar } from '@mui/material';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { UserType } from 'shared/types';
import './userinfo.scss';

interface UserInfoProps {
  user: UserType | null;
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  // const userNameParams = useParams().username;
  return (
    <>
      <div className="userInfo">
        <div className="userInfo-wrapper">
          <div className="userInfo-background-image">
            <img src="http://uitheme.net/sociala/images/u-bg.jpg" alt="" />
          </div>
          <div className="userInfo-avatar-and-name">
            <Avatar className="userInfo-avatar" src={user?.avatar} alt="" />
            <div className="userInfo-name">
              <h2>{user?.fullName}</h2>
              <p>{user?.email}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="userInfo-navigate">
          <NavLink
            to={`/${user?.username}`}
            className={({ isActive }) =>
              isActive ? 'userInfo-navigate-item active' : 'userInfo-navigate-item'
            }
          >
            <span>About</span>
          </NavLink>
          <NavLink
            to={`/${user?.username}/videos`}
            className={({ isActive }) =>
              isActive ? 'userInfo-navigate-item active' : 'userInfo-navigate-item'
            }
          >
            <span>Videos</span>
          </NavLink>
          <NavLink
            to={`/${user?.username}/photos`}
            className={({ isActive }) =>
              isActive ? 'userInfo-navigate-item active' : 'userInfo-navigate-item'
            }
          >
            <span>Photos</span>
          </NavLink>
          <NavLink
            to={`/${user?.username}/friends`}
            className={({ isActive }) =>
              isActive ? 'userInfo-navigate-item active' : 'userInfo-navigate-item'
            }
          >
            <span>Friends</span>
          </NavLink>
          <NavLink
            to={`/${user?.username}/groups`}
            className={({ isActive }) =>
              isActive ? 'userInfo-navigate-item active' : 'userInfo-navigate-item'
            }
          >
            <span>Group</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
