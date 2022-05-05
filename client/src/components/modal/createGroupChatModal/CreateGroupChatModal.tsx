import React from 'react';

import { AiOutlineUserAdd } from 'react-icons/ai';

import './createGroupChatModal.scss';

const CreateGroupChatModal = () => {
  return (
    <div className="CreateGroupChatModal">
      <h2 className="CreateGroupChatModal-header">Create Group Chat</h2>
      <div className="CreateGroupChatModal-wrapper">
        <div className="CreateGroupChatModal-input">
          <input type="text" placeholder="Chat name" />
        </div>
        <div className="CreateGroupChatModal-buttons">
          <button className="CreateGroupChatModal-button">
            <AiOutlineUserAdd /> <span>Add Member</span>
          </button>
        </div>
        <div className="CreateGroupChatModal-buttons">
          <button className="CreateGroupChatModal-button">Create group</button>
          <button className="CreateGroupChatModal-button-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupChatModal;
