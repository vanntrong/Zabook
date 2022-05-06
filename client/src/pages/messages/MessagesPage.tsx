import { Avatar } from '@mui/material';
import {
  changeNameConversationApi,
  getConversationsApi,
  changeAvatarConversationApi,
  createNewConversationApi,
  createGroupConversationApi,
  removeUserFromGroupConversationApi,
} from 'api/conversationApi';
import ChatBox from 'components/chatBox/ChatBox';
import Conversations from 'components/conversations/Conversations';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineEdit, AiOutlineSearch } from 'react-icons/ai';
import { BsFillCameraVideoFill, BsThreeDots } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { HiPhotograph } from 'react-icons/hi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoCreateOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { conversationType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import { toast } from 'react-toastify';
import CreateGroupChatModal from './../../components/modal/createGroupChatModal/CreateGroupChatModal';
import './messagesPage.scss';
import { convertFileSize } from 'utils/upload';
import useSearchUser from 'hooks/useSearchUser';
import Backdrop from 'components/backdrop/Backdrop';
import ProgressLoading from 'components/loadings/progressLoading/ProgressLoading';
import { selectSocket } from 'store/slice/socketSlice';

const MessagesPage = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isShowRightBar, setIsShowRightBar] = useState(false);
  const [isShowChangeChatName, setIsShowChangeChatName] = useState(false);
  const [conversations, setConversations] = useState<conversationType[]>([]);
  const [currentConversation, setCurrenConversation] = useState<conversationType>();
  const [newGroupNameValue, setNewGroupNameValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isShowCreateGroupChatModal, setIsShowCreateGroupChatModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const photoGroupRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const params = useParams();
  const { searchResult } = useSearchUser(searchText);
  const socket = useAppSelector(selectSocket);

  const nameOfConversation = currentConversation?.isGroupChat
    ? currentConversation?.chatName
    : currentConversation?.members.filter((member) => member._id !== currentUser?._id)[0].fullName;

  const avatarOfConversation = !currentConversation?.isGroupChat
    ? currentConversation?.members.find((member) => member._id !== currentUser?._id)?.avatar
    : currentConversation?.avatar;

  useEffect(() => {
    document.title = 'Sociala. | Messages';
  }, []);

  const handleChangePhotoClick = () => {
    photoGroupRef.current?.click();
  };

  const handlePhotoGroupChange = async () => {
    if (photoGroupRef.current?.files?.length) {
      const file = photoGroupRef.current?.files[0];
      const fileSize = convertFileSize(file.size);
      if (fileSize > 10) {
        toast.error('File size must be less than 10MB');
      } else {
        setIsLoading(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const url = reader.result as string;
          const res = await changeAvatarConversationApi(currentConversation!._id, url);
          setConversations((prev) =>
            prev.map((conversation) =>
              conversation._id === currentConversation!._id ? res : conversation
            )
          );
          setIsLoading(false);
        };
      }
    }
  };

  const handleLeaveGroup = async () => {
    setIsLoading(true);
    try {
      const res = await removeUserFromGroupConversationApi(
        currentUser!._id,
        currentConversation!._id
      );
      setConversations((prev) => prev.filter((conversation) => conversation._id !== res._id));
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleChangeChatName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentConversation) {
      setIsLoading(true);
      try {
        const res = await changeNameConversationApi(currentConversation._id, newGroupNameValue);
        setConversations((prev) =>
          prev.map((conversation) =>
            conversation._id === currentConversation._id ? res : conversation
          )
        );
        toast.success('🦄 Change group name success!', {});
      } catch (error) {
        toast.error(`🦄 Oops! ${error.response.data}`, {});
      }
      setIsLoading(false);
    }
    setNewGroupNameValue('');
  };

  useEffect(() => {
    const getConversations = async () => {
      const res = await getConversationsApi();
      setConversations(res);
    };
    getConversations();
  }, []);

  useEffect(() => {
    if (!params.conversationId && conversations.length > 0) {
      navigate(`/messages/${conversations[0]._id}`);
    }
    setCurrenConversation(
      conversations.find((conversation) => conversation._id === params.conversationId)
    );
  }, [navigate, conversations, params.conversationId]);

  const handleCreateSingleConversation = async (userId: string) => {
    setIsLoading(true);
    const { conversation, isNew } = await createNewConversationApi(userId);
    if (isNew) {
      setConversations((prev) => [conversation, ...prev]);
      socket?.emit('createConversation', {
        creator: currentUser?._id,
        conversation: conversation,
      });
      navigate(`/messages/${conversation._id}`);
    } else {
      setConversations((prev) => prev.map((c) => (c._id === conversation._id ? conversation : c)));
    }
    setIsLoading(false);
    setSearchText('');
  };

  const handleCreateGroupConversation = async (members: string[], chatName: string) => {
    setIsLoading(true);
    const newConversation = await createGroupConversationApi(members, chatName);
    setConversations((prev) => [newConversation, ...prev]);
    socket?.emit('createConversation', {
      creator: currentUser?._id,
      conversation: newConversation,
    });
    navigate(`/messages/${newConversation._id}`);
    setIsLoading(false);
  };

  useEffect(() => {
    socket?.on('getConversation', (data: { conversation: conversationType }) => {
      setConversations((prev) => [data.conversation, ...prev]);
    });
  }, [socket]);

  const handleCloseCreateGroupChatModal = () => {
    setIsShowCreateGroupChatModal(false);
  };

  return (
    <>
      <div className="messagesPage">
        <div className="messagesPage-wrapper">
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
                  {searchResult.map((user) => (
                    <div
                      className="messagesPage-searchResult-item"
                      key={user._id}
                      onClick={() => handleCreateSingleConversation(user._id)}
                    >
                      <Avatar src={user.avatar} />
                      <span>{user.fullName}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Conversations conversations={conversations} />
          </div>
          <div className="messagesPage-wrapper-center">
            {currentConversation && (
              <div className="messagesPage-wrapper-center-top">
                <div className="messagesPage-wrapper-center-top-left">
                  <Avatar src={avatarOfConversation} />
                  <h3>{nameOfConversation}</h3>
                </div>
                <div className="messagesPage-wrapper-center-top-right">
                  <div className="messagesPage-wrapper-center-top-right-icon">
                    <BsFillCameraVideoFill />
                  </div>
                  <div
                    className="messagesPage-wrapper-center-top-right-icon"
                    onClick={() => setIsShowRightBar((prev) => !prev)}
                  >
                    <BsThreeDots />
                  </div>
                </div>
              </div>
            )}
            {currentConversation && (
              <ChatBox
                setConversations={setConversations}
                currentConversation={currentConversation}
              />
            )}
            {conversations.length === 0 && <p className="no-conversation">No Conversation</p>}
          </div>

          {isShowRightBar && (
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
                      <form onSubmit={handleChangeChatName}>
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

                  <div
                    className="messagesPage-wrapper-right-options-item"
                    onClick={handleChangePhotoClick}
                  >
                    <HiPhotograph />
                    <span>Change group photo</span>
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      multiple={false}
                      ref={photoGroupRef}
                      onChange={handlePhotoGroupChange}
                    />
                  </div>

                  <div
                    className="messagesPage-wrapper-right-options-item"
                    onClick={handleLeaveGroup}
                  >
                    <FiLogOut />
                    <span>Leave group</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <CreateGroupChatModal
        isOpen={isShowCreateGroupChatModal}
        handleClose={handleCloseCreateGroupChatModal}
        onConfirm={handleCreateGroupConversation}
      />
      <Backdrop
        isShow={isShowCreateGroupChatModal}
        setIsShow={setIsShowCreateGroupChatModal}
        color="#fff"
        opacity={0.7}
      />
      {isLoading && <ProgressLoading />}
    </>
  );
};

export default MessagesPage;
