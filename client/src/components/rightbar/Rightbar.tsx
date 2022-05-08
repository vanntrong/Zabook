import OnlineUser from 'components/onlineUser/OnlineUser';
import React, { FC } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser, selectOnlineUsers } from 'store/slice/userSlice';
import './rightbar.scss';

interface RightbarProps {
  className?: string;
}

const RightBar: FC<RightbarProps> = ({ className }) => {
  const userOnlineList = useAppSelector(selectOnlineUsers);
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <div className="rightBar">
      <div className="rightBar-list">
        <h4 className="rightBar-title">CONTACTS</h4>
        {userOnlineList.length > 0 &&
          userOnlineList.map(
            (user) =>
              user.userData._id !== currentUser?._id && (
                <OnlineUser key={user.userData._id} user={user.userData} />
              )
          )}
      </div>
    </div>
  );
};

export default RightBar;
