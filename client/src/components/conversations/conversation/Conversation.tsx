import { Avatar } from '@mui/material';
import React from 'react';

import './conversation.scss';

const Conversation = () => {
  return (
    <div className="conversation">
      <Avatar className="conversation-avatar" />
      <div className="conversation-info">
        <h3 className="conversation-name">Jonas</h3>
        <div className="conversation-lastedMessage-and-time">
          <p className="conversation-lastedMessage">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi quia, animi
            inventore pariatur praesentium sit unde sunt, ullam ab voluptatibus, quisquam cupiditate
            commodi laudantium voluptatum dolorem illum? Qui, explicabo nihil.
          </p>
          <span className="conversation-time">3m</span>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
