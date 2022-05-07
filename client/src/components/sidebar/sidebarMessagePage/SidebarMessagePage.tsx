import { Avatar } from '@mui/material';
import Conversations from 'components/conversations/Conversations';
import { searchResult } from 'components/modal/searchResultModal/SearchResultModal';
import useSearchUser from 'hooks/useSearchUser';
import React, { FC, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoCreateOutline } from 'react-icons/io5';
import { conversationType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';

interface Props {
  setIsShowCreateGroupChatModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateSingleConversation: (userId: string) => Promise<void>;
  conversations: conversationType[];
}

const SidebarMessagePage: FC<Props> = ({
  setIsShowCreateGroupChatModal,
  handleCreateSingleConversation,
  conversations,
}) => {
  const [searchText, setSearchText] = useState('');

  const { searchResult } = useSearchUser(searchText);

  const currentUser = useAppSelector(selectCurrentUser);

  const handleCreateSingleChat = (user: searchResult) => {
    handleCreateSingleConversation(user._id);
    setSearchText('');
  };
  return (
    <div className="messagesPage-wrapper-left">
      <div className="messagesPage-wrapper-left-top">
        <Avatar className="messagesPage-wrapper-left-top-avatar" />
        <h4 className="messagesPage-wrapper-left-top-title">Chats</h4>
        <div
          className="messagesPage-wrapper-left-top-button"
          onClick={() => setIsShowCreateGroupChatModal(true)}
        >
          <IoCreateOutline />
        </div>
      </div>
      <div className="messagesPage-wrapper-left-input-search">
        <AiOutlineSearch />
        <input
          type="text"
          placeholder="Search Messenger"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchResult.length > 0 && (
          <div className="messagesPage-searchResult-list">
            {searchResult.map(
              (user) =>
                currentUser?._id !== user._id && (
                  <div
                    className="messagesPage-searchResult-item"
                    key={user._id}
                    onClick={() => handleCreateSingleChat(user)}
                  >
                    <Avatar src={user.avatar} />
                    <span>{user.fullName}</span>
                  </div>
                )
            )}
          </div>
        )}
      </div>
      <Conversations conversations={conversations} />
    </div>
  );
};

export default SidebarMessagePage;
