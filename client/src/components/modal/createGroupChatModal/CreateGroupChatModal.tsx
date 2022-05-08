import { SearchPeopleToTag } from 'components/input/InputPost/inputPostModal/InputPostModal';
import React, { FC, useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { toast } from 'react-toastify';
import './createGroupChatModal.scss';

interface CreateGroupChatModalProps {
  isOpen: boolean;
  handleClose: () => void;
  onConfirm: (member: string[], chatName: string) => void;
}

const CreateGroupChatModal: FC<CreateGroupChatModalProps> = ({
  isOpen,
  handleClose,
  onConfirm,
}) => {
  const [isOpenSearchUser, setIsOpenSearchUser] = useState(false);
  const [tagsPeople, setTagsPeople] = useState<string[]>([]);
  const [chatName, setChatName] = useState('');

  const changeCloseSearchUser = () => setIsOpenSearchUser(false);

  const handleConfirm = () => {
    if (chatName.trim().length === 0) {
      toast.error('Please enter a name for the chat', {});
      return;
    }
    if (tagsPeople.length < 2) {
      toast.error('Please select at least 2 members', {});
      return;
    }
    onConfirm(tagsPeople, chatName);
  };
  return (
    <>
      {isOpen ? (
        <>
          <div className="CreateGroupChatModal">
            <h2 className="CreateGroupChatModal-header">Create Group Chat</h2>
            <div className="CreateGroupChatModal-wrapper">
              <div className="CreateGroupChatModal-input">
                <input
                  type="text"
                  placeholder="Chat name"
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                />
              </div>
              <div className="CreateGroupChatModal-buttons">
                <button
                  className="CreateGroupChatModal-button"
                  onClick={() => setIsOpenSearchUser(true)}
                >
                  <AiOutlineUserAdd /> <span>Add Member</span>
                </button>
              </div>
              <div className="CreateGroupChatModal-buttons">
                <button className="CreateGroupChatModal-button" onClick={handleConfirm}>
                  Create group
                </button>
                <button className="CreateGroupChatModal-button-cancel" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
          {isOpenSearchUser && (
            <SearchPeopleToTag
              type="tag"
              onClose={changeCloseSearchUser}
              setTagsPeople={setTagsPeople}
              tagsPeople={tagsPeople}
            />
          )}
        </>
      ) : null}
    </>
  );
};

export default CreateGroupChatModal;
