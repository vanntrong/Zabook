import { Avatar } from '@mui/material';
import React, { FC, useRef, useState } from 'react';
import { AiOutlineEdit, AiOutlineUserAdd } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { HiPhotograph } from 'react-icons/hi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { conversationType } from 'shared/types';

interface Props {
  avatarOfConversation: string | undefined;
  nameOfConversation: string | undefined;
  currentConversation: conversationType | undefined;
  handleChangeChatName: (newGroupNameValue: string) => Promise<void>;
  handlePhotoGroupChange: (file: File) => Promise<void>;
  handleLeaveGroup: () => Promise<void>;
}

const RightbarMessagePage: FC<Props> = ({
  avatarOfConversation,
  nameOfConversation,
  currentConversation,
  handleChangeChatName,
  handlePhotoGroupChange,
  handleLeaveGroup,
}) => {
  const [isShowChangeChatName, setIsShowChangeChatName] = useState(false);
  const [newGroupNameValue, setNewGroupNameValue] = useState('');
  const photoGroupRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleChangeChatName(newGroupNameValue);
    setIsShowChangeChatName(false);
    setNewGroupNameValue('');
  };

  const handleChangePhotoClick = () => {
    photoGroupRef.current?.click();
  };

  const handleChangePhoto = () => {
    if (photoGroupRef.current?.files?.length) {
      const file = photoGroupRef.current?.files[0];
      handlePhotoGroupChange(file);
    }
  };
  return (
    <div className="messagesPage-wrapper-right">
      <div className="messagesPage-wrapper-right-top">
        <Avatar className="messagesPage-wrapper-right-avatar" src={avatarOfConversation} />
        <h3>{nameOfConversation}</h3>
      </div>
      {currentConversation?.isGroupChat && (
        <div className="messagesPage-wrapper-right-options">
          <div
            className="messagesPage-wrapper-right-options-item"
            onClick={() => setIsShowChangeChatName((prev) => !prev)}
          >
            <AiOutlineEdit />
            <span style={{ marginRight: 'auto' }}>Change chat name</span>
            {isShowChangeChatName && <IoIosArrowUp />}
            {!isShowChangeChatName && <IoIosArrowDown />}
          </div>
          {isShowChangeChatName && (
            <div className="change-chat-name">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter new chat name"
                  value={newGroupNameValue}
                  onChange={(e) => setNewGroupNameValue(e.target.value)}
                />
                <button type="submit">Change</button>
              </form>
            </div>
          )}
          <div className="messagesPage-wrapper-right-options-item" onClick={handleChangePhotoClick}>
            <HiPhotograph />
            <span>Change group photo</span>
            <input
              type="file"
              hidden
              accept="image/*"
              multiple={false}
              ref={photoGroupRef}
              onChange={handleChangePhoto}
            />
          </div>
          <div className="messagesPage-wrapper-right-options-item">
            <AiOutlineUserAdd />
            <span>Add new member</span>
          </div>
          <div className="messagesPage-wrapper-right-options-item" onClick={handleLeaveGroup}>
            <FiLogOut />
            <span>Leave group</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightbarMessagePage;
