import { getOnlineUsersApi } from 'api/userApi';
import OnlineUser from 'components/onlineUser/OnlineUser';
import React, { FC, useEffect } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import { selectCurrentUser, selectOnlineUsers } from 'store/slice/userSlice';
import './rightbar.scss';

interface RightbarProps {
  className?: string;
}

export interface onlineUserType {
  _id: string;
  avatar: string;
  username: string;
  fullName: string;
}

const RightBar: FC<RightbarProps> = ({ className }) => {
  const userOnlineList = useAppSelector(selectOnlineUsers);
  const currentUser = useAppSelector(selectCurrentUser);
  const [onlineList, setOnlineList] = React.useState<string[]>([]);
  const [onlineUsers, setOnlineUsers] = React.useState<onlineUserType[]>([]);
  const isDarkMode = useAppSelector(selectTheme);

  useEffect(() => {
    setOnlineList(userOnlineList.map((user) => user.userId));
  }, [userOnlineList]);

  useEffect(() => {
    const getUserOnlineList = async () => {
      const userOnlineList = await getOnlineUsersApi(onlineList);
      setOnlineUsers(userOnlineList);
    };
    getUserOnlineList();
  }, [onlineList]);
  return (
    <div className={`rightBar ${isDarkMode ? 'dark' : ''}`}>
      <div className="rightBar-list">
        <h4 className="rightBar-title">CONTACTS</h4>
        {onlineUsers.length > 0 &&
          onlineUsers.map(
            (user) => user._id !== currentUser?._id && <OnlineUser key={user._id} user={user} />
          )}
      </div>
    </div>
  );
};

export default RightBar;
