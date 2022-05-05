import { Avatar } from '@mui/material';
import React, { FC } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import './message.scss';

interface MessageProps {
  isRightMessage: boolean;
}

const Message: FC<MessageProps> = ({ isRightMessage }) => {
  return (
    <div className={`message ${isRightMessage ? 'right-message' : ''}`}>
      <Avatar className="message-avatar" />
      <div className="message-content-and-time">
        <p className="message-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
        </p>
        <span className="message-time">5:05Pm</span>
      </div>
      <div className="message-button">
        <BsThreeDotsVertical />
      </div>
    </div>
  );
};

export default Message;
