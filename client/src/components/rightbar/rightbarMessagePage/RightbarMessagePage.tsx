import { Avatar } from '@mui/material';
import { SearchPeopleToTag } from 'components/input/InputPost/inputPostModal/InputPostModal';
import React, { FC, useEffect, useRef, useState } from 'react';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { GrAdd } from 'react-icons/gr';
import { HiPhotograph } from 'react-icons/hi';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { conversationType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';

interface Props {
  avatarOfConversation: string | undefined;
  nameOfConversation: string | undefined;
  currentConversation: conversationType | undefined;
  handleChangeChatName: (newGroupNameValue: string) => Promise<void>;
  handlePhotoGroupChange: (file: File) => Promise<void>;
  handleLeaveGroup: () => Promise<void>;
  handleRemoveUserFromGroup: (userId: string) => Promise<void>;
  handleAddUsersToGroup: (members: string[]) => Promise<void>;
}

const RightbarMessagePage: FC<Props> = ({
  avatarOfConversation,
  nameOfConversation,
  currentConversation,
  handleChangeChatName,
  handlePhotoGroupChange,
  handleLeaveGroup,
  handleRemoveUserFromGroup,
  handleAddUsersToGroup,
}) => {
  const [isShowChangeChatName, setIsShowChangeChatName] = useState(false);
  const [isShowGroupMembers, setIsShowGroupMembers] = useState(false);
  const [newGroupNameValue, setNewGroupNameValue] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [isShowModalAddUser, setIsShowModalAddUser] = useState(false);
  const photoGroupRef = useRef<HTMLInputElement>(null);
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (currentConversation) {
      setMembers(currentConversation.members.map((member) => member._id));
    }
  }, [currentConversation]);

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

  const handleCloseModalAddUser = () => {
    setIsShowModalAddUser(false);
  };

  const handleAddClick = () => {
    handleAddUsersToGroup(members);
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
            <span>Change chat name</span>
            {!isShowChangeChatName && <IoIosArrowForward />}
            {isShowChangeChatName && <IoIosArrowDown />}
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
          <div
            className="messagesPage-wrapper-right-options-item"
            onClick={() => setIsShowGroupMembers((prev) => !prev)}
          >
            <BiUser />
            <span>Chat members</span>
            {!isShowGroupMembers && <IoIosArrowForward />}
            {isShowGroupMembers && <IoIosArrowDown />}
          </div>
          {isShowGroupMembers && (
            <div className="messagesPage-member-list">
              {currentConversation?.members.map((member) => (
                <div className="messagesPage-member-item" key={member._id}>
                  <div className="messagesPage-member-item-info">
                    <Link to={`/${member.username}`}>
                      <Avatar className="messagesPage-member-item-avatar" src={member.avatar} />
                    </Link>
                    <span>{member.fullName}</span>
                  </div>
                  {currentConversation.groupAdmin.includes(currentUser!._id) &&
                    currentUser?._id !== member._id && (
                      <div
                        className="messagesPage-member-modal"
                        onClick={() => handleRemoveUserFromGroup(member._id)}
                      >
                        <AiFillDelete />
                      </div>
                    )}
                </div>
              ))}
              <div className="messagesPage-member-add" onClick={() => setIsShowModalAddUser(true)}>
                <div className="messagesPage-member-add-icon">
                  <GrAdd />
                </div>
                <span>Add people</span>
              </div>
            </div>
          )}

          <div className="messagesPage-wrapper-right-options-item" onClick={handleLeaveGroup}>
            <FiLogOut />
            <span>Leave chat</span>
          </div>
        </div>
      )}
      {isShowModalAddUser && (
        <SearchPeopleToTag
          type="add"
          onClose={handleCloseModalAddUser}
          setTagsPeople={setMembers}
          tagsPeople={members}
          handleAdd={handleAddClick}
        />
      )}
    </div>
  );
};

export default RightbarMessagePage;
