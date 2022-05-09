import { Avatar } from '@mui/material';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { messageType } from 'shared/types';
import { AiFillDelete } from 'react-icons/ai';
import './message.scss';
import { deleteMessageApi } from 'api/messageApi';
import { toast } from 'react-toastify';
import { Player } from 'react-tuby';
import ImagePlayer from 'components/player/imagePlayer/ImagePlayer';

interface MessageProps {
  isRightMessage: boolean;
  message: messageType;
  setMessages: React.Dispatch<React.SetStateAction<messageType[]>>;
}

const Message: FC<MessageProps> = ({ isRightMessage, message, setMessages }) => {
  const [isShowModalButton, setIsShowModalButton] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await deleteMessageApi(message._id, message.sender._id);
      setMessages((prev) => prev.map((message) => (message._id !== res._id ? message : res)));
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  switch (message.type) {
    case 'message':
      return (
        <div className={`message ${isRightMessage ? 'right-message' : ''}`}>
          <div className="message-avatar-and-name">
            <Avatar className="message-avatar" src={message.sender.avatar}></Avatar>
            <span className="message-name">{message.sender.fullName}</span>
          </div>
          <div className="message-content-and-time">
            <p className={`message-content ${message.isDeleted ? 'deleted' : ''}`}>
              {message.isDeleted ? 'Message has been removed' : message?.content}
            </p>
            <span className="message-time">{moment(message.createdAt).format('LT')}</span>
          </div>

          {isRightMessage && !message.isDeleted && (
            <>
              <div style={{ position: 'relative' }}>
                <div
                  className="message-button"
                  onClick={() => setIsShowModalButton((prev) => !prev)}
                >
                  <BsThreeDotsVertical />
                </div>
                {isShowModalButton && (
                  <div className="modal-message" onClick={handleDelete}>
                    <AiFillDelete />
                    <span>Remove</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      );
    case 'notification':
      return (
        <div className="notificationChatBox">
          <Avatar className="notificationChatBox-avatar" src={message.sender.avatar} />
          <p className="notification-content">
            <span className="notification-name">{message.sender.fullName} </span>
            {message?.content}
          </p>
        </div>
      );
    case 'asset':
      return (
        <div className={`message message-asset ${isRightMessage ? 'right-message' : ''}`}>
          <div className="message-avatar-and-name">
            <Avatar className="message-avatar" src={message.sender.avatar}></Avatar>
            <span className="message-name">{message.sender.fullName}</span>
          </div>
          <div className={`message-content-and-time message-content-${message.asset?.media_type}`}>
            {message.isDeleted && (
              <p className={'message-content deleted'}>Message has been removed</p>
            )}
            {message.asset &&
              !message.isDeleted &&
              (message.asset.media_type === 'image' ? (
                <ImagePlayer src={message.asset.url} />
              ) : (
                <Player src={message.asset.url} keyboardShortcut={false} />
              ))}
            <span className="message-time">{moment(message.createdAt).format('LT')}</span>
          </div>

          {isRightMessage && !message.isDeleted && (
            <>
              <div style={{ position: 'relative' }}>
                <div
                  className="message-button"
                  onClick={() => setIsShowModalButton((prev) => !prev)}
                >
                  <BsThreeDotsVertical />
                </div>
                {isShowModalButton && (
                  <div className="modal-message" onClick={handleDelete}>
                    <AiFillDelete />
                    <span>Remove</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      );
    default:
      return null;
  }
};

export default Message;
