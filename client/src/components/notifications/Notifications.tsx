import { seenAllNotification, seenNotificationApi } from 'api/notificationApi';
import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';
import React, { FC, useState } from 'react';
import { notificationType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import Notification from './notification/Notification';

import './notifications.scss';

interface Props {
  notifications: notificationType[];
  isLoadingNotification: boolean;
  unSeenNotifications: notificationType[];
  setNotifications: React.Dispatch<React.SetStateAction<notificationType[]>>;
}

const Notifications: FC<Props> = ({
  notifications,
  setNotifications,
  unSeenNotifications,
  isLoadingNotification,
}) => {
  const [isSeeUnReadNotification, setIsSeeUnReadNotification] = useState(false);
  const isDarkMode = useAppSelector(selectTheme);
  const handleReadNotification = async (id: string) => {
    const res = await seenNotificationApi(id);
    if (res) {
      setNotifications((prev) => prev.map((notify) => (notify._id !== res._id ? notify : res)));
    }
  };

  const readAllNotification = async () => {
    const res = await seenAllNotification();
    if (res) {
      setNotifications(res);
    }
  };

  return (
    <div className={`notifications ${isDarkMode ? 'dark' : ''}`}>
      <h2 className="notifications-title">Notifications</h2>
      <div className="notifications-buttons">
        <button
          className={`${!isSeeUnReadNotification ? 'active' : ''}`}
          onClick={() => setIsSeeUnReadNotification(false)}
        >
          All
        </button>
        <button
          className={`${isSeeUnReadNotification ? 'active' : ''}`}
          onClick={() => setIsSeeUnReadNotification(true)}
        >
          Unread
        </button>
      </div>
      <div className="notifications-title-list">
        <h3>Earlier</h3>
        <button onClick={readAllNotification}>Make all as read</button>
      </div>
      <div className="notifications-list">
        {isLoadingNotification && <SkeletonLoading type="info" />}
        {!isLoadingNotification && (
          <>
            {!isSeeUnReadNotification &&
              notifications.length > 0 &&
              notifications.map((notification) => (
                <Notification
                  key={notification._id}
                  notification={notification}
                  onSeen={handleReadNotification}
                />
              ))}
            {isSeeUnReadNotification &&
              unSeenNotifications.length > 0 &&
              unSeenNotifications.map((notification) => (
                <Notification
                  key={notification._id}
                  notification={notification}
                  onSeen={handleReadNotification}
                />
              ))}
            {!isSeeUnReadNotification && notifications.length === 0 && (
              <p style={{ textAlign: 'center' }}>No notifications</p>
            )}
            {isSeeUnReadNotification &&
              unSeenNotifications.length === 0 &&
              unSeenNotifications.length === 0 && (
                <p style={{ textAlign: 'center' }}>No notifications un seen</p>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications;
