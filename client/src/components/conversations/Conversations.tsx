import React, { FC } from 'react';
import { conversationType } from 'shared/types';
import Conversation from './conversation/Conversation';

import './conversations.scss';

interface ConversationsProps {
  conversations: conversationType[];
  conversationNotSeenList: string[];
}

const Conversations: FC<ConversationsProps> = ({ conversations, conversationNotSeenList }) => {
  return (
    <div className="conversations">
      {conversations.length > 0 &&
        conversations.map((conversation) => (
          <Conversation
            key={conversation?._id}
            conversation={conversation}
            isNotSeen={conversationNotSeenList.includes(conversation._id)}
          />
        ))}
    </div>
  );
};

export default Conversations;
