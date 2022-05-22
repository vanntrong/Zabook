import { Avatar } from '@mui/material';
import moment from 'moment';
import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { conversationType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import { selectCurrentUser } from 'store/slice/userSlice';

import './conversation.scss';

interface conversationProps {
  conversation: conversationType;
  isNotSeen: boolean;
}

const Conversation: FC<conversationProps> = ({ conversation, isNotSeen }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const isDarkMode = useAppSelector(selectTheme);
  const { conversationId } = useParams();
  return (
    <Link to={`/messages/${conversation?._id}`}>
      <div
        className={`conversation ${
          conversationId && conversationId === conversation?._id ? 'active' : ''
        } ${isDarkMode ? 'dark' : ''}`}
      >
        <Avatar
          className="conversation-avatar"
          src={
            !conversation?.isGroupChat
              ? conversation?.members.find((member) => member._id !== currentUser?._id)?.avatar
              : conversation?.avatar
          }
        />
        <div className="conversation-info">
          <div className="conversation-info-lastedMessage-name">
            <h3 className="conversation-name">
              {conversation?.isGroupChat
                ? conversation?.chatName
                : conversation?.members.find((member) => member._id !== currentUser?._id)?.fullName}
            </h3>
            <div className="conversation-lastedMessage-and-time">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p className={`conversation-lastedMessage ${isNotSeen ? 'not-seen' : ''}`}>
                  {conversation?.lastMessage?.sender._id === currentUser?._id && 'You: '}
                  {conversation?.lastMessage?.content}
                </p>
                <span className="conversation-time">
                  {moment(conversation?.lastMessage?.createdAt).fromNow(true)}
                </span>
              </div>
            </div>
          </div>
          {isNotSeen && <div className="conversation-not-seen"></div>}
        </div>
      </div>
    </Link>
  );
};

export default Conversation;
