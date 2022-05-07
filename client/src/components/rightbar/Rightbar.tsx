import { Avatar } from '@mui/material';
import React, { FC, useState } from 'react';
import { UserType } from 'shared/types';
import './rightbar.scss';

interface RightbarProps {
  className?: string;
}

const RightBar: FC<RightbarProps> = ({ className }) => {
  const [onlineUserList, setOnlineUserList] = useState<UserType[]>([]);

  // useEffect(() => {
  //   socket?.on("onlineUsers", (data:))
  // },[])
  return (
    <div className="rightBar">
      <div className="rightBar-list">
        <h4 className="rightBar-title">CONTACTS</h4>
        <div className="rightBar-item">
          <Avatar
            className="rightBar-item-img"
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          />
          <span className="rightBar-item-name">Hurin Seary</span>
        </div>
        <div className="rightBar-item">
          <Avatar
            className="rightBar-item-img"
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          />
          <span className="rightBar-item-name">Arian Seary</span>
        </div>
        <div className="rightBar-item">
          <Avatar
            className="rightBar-item-img"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          />
          <span className="rightBar-item-name">Hurin Aliba</span>
        </div>
        <div className="rightBar-item">
          <Avatar
            className="rightBar-item-img"
            src="https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          />
          <span className="rightBar-item-name">Alison Seary</span>
        </div>
        <div className="rightBar-item">
          <Avatar
            className="rightBar-item-img"
            src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          />
          <span className="rightBar-item-name">Hurin Alaba</span>
        </div>
        <div className="rightBar-item">
          <Avatar
            className="rightBar-item-img"
            src="https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHVzZXIlMjBhdmF0YXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          />
          <span className="rightBar-item-name">Hurin Henry</span>
        </div>
        <div className="rightBar-item">
          <Avatar
            className="rightBar-item-img"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHVzZXIlMjBhdmF0YXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          />
          <span className="rightBar-item-name">Hald Seary</span>
        </div>
        <div className="rightBar-item">
          <Avatar
            className="rightBar-item-img"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHVzZXIlMjBhdmF0YXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          />
          <span className="rightBar-item-name">Hurin Asus</span>
        </div>
      </div>
      <div className="rightBar-list">
        <h4 className="rightBar-title">GROUPS</h4>
        <div className="rightBar-item">
          <Avatar className="rightBar-item-img">UD</Avatar>
          <span className="rightBar-item-name">Studio Express</span>
        </div>
        <div className="rightBar-item">
          <Avatar className="rightBar-item-img">AR</Avatar>
          <span className="rightBar-item-name">Armany Design</span>
        </div>
        <div className="rightBar-item">
          <Avatar className="rightBar-item-img">DF</Avatar>
          <span className="rightBar-item-name">De fabous</span>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
