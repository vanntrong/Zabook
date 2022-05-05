import Message from 'components/message/Message';
import React from 'react';
import { FiSend } from 'react-icons/fi';

import './chatBox.scss';

const ChatBox = () => {
  return (
    <div className="chatBox">
      <div className="chatBox-messages">
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={false} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={false} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={false} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={false} />
        <Message isRightMessage={false} />
        <Message isRightMessage={false} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={false} />
        <Message isRightMessage={true} />
        <Message isRightMessage={false} />
        <Message isRightMessage={false} />
        <Message isRightMessage={true} />
        <Message isRightMessage={false} />
        <Message isRightMessage={true} />
        <Message isRightMessage={false} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
        <Message isRightMessage={true} />
      </div>
      <div className="chatBox-input">
        <form>
          <input placeholder="Aa" />
          <button type="submit">
            <FiSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
