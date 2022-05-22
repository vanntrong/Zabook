import { Avatar } from '@mui/material';
import moment from 'moment';
import React, { FC } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaCommentAlt, FaHistory, FaUserCheck, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { notificationType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import './notification.scss';

interface Props {
  notification: notificationType;
  onSeen: (id: string) => Promise<void>;
}

const NotificationBadge: FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'like':
      return <AiFillHeart />;
    case 'comment':
      return <FaCommentAlt />;
    case 'friendRequest':
      return <FaUserCheck />;
    case 'friendAccepted':
      return <FaUserFriends />;
    case 'story':
      return <FaHistory />;
    default:
      return null;
  }
};

const Notification: FC<Props> = ({ notification, onSeen }) => {
  const isDarkMode = useAppSelector(selectTheme);
  return (
    <Link to={notification.link} onClick={() => onSeen(notification._id)}>
      <div
        className={`notification notification-${notification.type} ${
          notification.isRead ? 'notification-read' : ''
        } ${isDarkMode ? 'dark' : ''}`}
      >
        <div style={{ position: 'relative' }}>
          <Avatar className="notification-avatar" />
          <div className="notification-badge">
            <NotificationBadge type={notification.type} />
          </div>
        </div>
        <div className="notification-content-time">
          <p className="notification-content">
            <span>{notification.from.fullName}</span> {notification.content}
          </p>
          <span className="notification-time">{moment(notification.createdAt).fromNow()}</span>
        </div>
      </div>
    </Link>
  );
};

export default Notification;
