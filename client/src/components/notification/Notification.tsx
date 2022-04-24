import React, { FC, useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';

import './notification.scss';

interface NotificationProps {
  type: 'error' | 'success';
  content: string;
}

const Notification: FC<NotificationProps> = ({ type, content }) => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const hideNotification = () => {
    setIsShow(false);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      hideNotification();
    }, 3000);
    return () => clearTimeout(timer);
  }, [isShow]);
  return (
    <div className={`notification ${isShow ? 'notification-show' : 'notification-hide'}`}>
      <div className="notification-main">
        <div className="notification-icon">
          {type === 'error' ? <ErrorIcon htmlColor="#d90429" /> : <DoneIcon htmlColor="#52b788" />}
        </div>
        <p className="notification-content">{content}</p>
      </div>
      <div onClick={() => hideNotification()}>
        <CloseIcon htmlColor="#6c757d" />
      </div>
      <div className="progress-bar"></div>
    </div>
  );
};

export default Notification;
