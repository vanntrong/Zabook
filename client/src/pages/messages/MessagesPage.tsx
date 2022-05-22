import { Avatar } from '@mui/material';
import {
  addUserToGroupConversationApi,
  changeAvatarConversationApi,
  changeNameConversationApi,
  createGroupConversationApi,
  createNewConversationApi,
  getConversationsApi,
  removeUserFromGroupConversationApi,
} from 'api/conversationApi';
import Backdrop from 'components/backdrop/Backdrop';
import ChatBox from 'components/chatBox/ChatBox';
import ProgressLoading from 'components/loadings/progressLoading/ProgressLoading';
import RightbarMessagePage from 'components/rightbar/rightbarMessagePage/RightbarMessagePage';
import SidebarMessagePage from 'components/sidebar/sidebarMessagePage/SidebarMessagePage';
import React, { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { conversationType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import { selectCurrentUser } from 'store/slice/userSlice';
import { socket } from 'utils/socket';
import { convertFileSize } from 'utils/upload';
import CreateGroupChatModal from './../../components/modal/createGroupChatModal/CreateGroupChatModal';
import './messagesPage.scss';

const MessagesPage = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const isDarkMode = useAppSelector(selectTheme);
  const [isShowRightBar, setIsShowRightBar] = useState(false);
  const [conversations, setConversations] = useState<conversationType[]>([]);
  const [currentConversation, setCurrenConversation] = useState<conversationType>();
  const [isShowCreateGroupChatModal, setIsShowCreateGroupChatModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationNotSeenList, setConversationNotSeenList] = useState<string[]>([]);
  const navigate = useNavigate();
  const params = useParams();

  const nameOfConversation = currentConversation?.isGroupChat
    ? currentConversation?.chatName
    : currentConversation?.members.filter((member) => member._id !== currentUser?._id)[0].fullName;

  const avatarOfConversation = !currentConversation?.isGroupChat
    ? currentConversation?.members.find((member) => member._id !== currentUser?._id)?.avatar
    : currentConversation?.avatar;

  useEffect(() => {
    document.title = 'Sociala. | Messages';
  }, []);

  const getConversations = async () => {
    const res = await getConversationsApi();
    setConversations(res);
    setIsLoading(false);
  };

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    if (params.conversationId) {
      setCurrenConversation(
        conversations.find((conversation) => conversation._id === params.conversationId)
      );
    }
  }, [navigate, conversations, params.conversationId]);

  useEffect(() => {
    socket.on('getConversation', (data: { conversation: conversationType }) => {
      setConversations((prev) => [data.conversation, ...prev]);
    });
  }, []);

  useEffect(() => {
    socket.on('get-change-group-info', (data) => {
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation._id !== data.group._id ? conversation : data.group
        )
      );
    });
  }, []);

  const handlePhotoGroupChange = async (file: File) => {
    if (file) {
      const fileSize = convertFileSize(file.size);
      if (fileSize > 10) {
        toast.error('File size must be less than 10MB');
      } else {
        setIsLoading(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const url = reader.result as string;
          const { conversation, message } = await changeAvatarConversationApi(
            currentConversation!._id,
            url
          );
          socket.emit('change-group-info', currentUser, conversation, message);
          setConversations((prev) =>
            prev.map((c) => (c._id === currentConversation!._id ? conversation : c))
          );
          setIsLoading(false);
        };
      }
    }
  };

  const handleLeaveGroup = async () => {
    setIsLoading(true);
    try {
      const { conversation, message } = await removeUserFromGroupConversationApi(
        currentUser!._id,
        currentConversation!._id
      );
      socket.emit('change-group-info', currentUser, conversation, message);
      setConversations((prev) => prev.filter((c) => c._id !== conversation._id));
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleChangeChatName = async (newGroupNameValue: string) => {
    if (currentConversation) {
      setIsLoading(true);
      try {
        const { conversation, message } = await changeNameConversationApi(
          currentConversation._id,
          newGroupNameValue
        );
        socket.emit('change-group-info', currentUser, conversation, message);
        setConversations((prev) =>
          prev.map((c) => (c._id === currentConversation._id ? conversation : c))
        );
        toast.success('🦄 Change group name success!', {});
      } catch (error) {
        toast.error(`🦄 Oops! ${error.response.data}`, {});
      }
      setIsLoading(false);
    }
  };

  const handleCreateSingleConversation = async (userId: string) => {
    setIsLoading(true);
    const { conversation, isNew } = await createNewConversationApi(userId);
    if (isNew) {
      setConversations((prev) => [conversation, ...prev]);
      socket?.emit('createConversation', {
        creator: currentUser?._id,
        conversation: conversation,
      });
    } else {
      setConversations((prev) => prev.map((c) => (c._id === conversation._id ? conversation : c)));
    }
    navigate(`/messages/${conversation._id}`);
    setIsLoading(false);
  };

  const handleCreateGroupConversation = async (members: string[], chatName: string) => {
    setIsLoading(true);
    const { conversation: newConversation, message } = await createGroupConversationApi(
      members,
      chatName
    );
    setConversations((prev) => [newConversation, ...prev]);
    socket?.emit('createConversation', {
      creator: currentUser?._id,
      conversation: newConversation,
      message,
    });
    navigate(`/messages/${newConversation._id}`);
    setIsLoading(false);
    handleCloseCreateGroupChatModal();
  };

  const handleCloseCreateGroupChatModal = () => {
    setIsShowCreateGroupChatModal(false);
  };

  const handleRemoveUserFromGroup = async (userId: string) => {
    try {
      const { conversation, message } = await removeUserFromGroupConversationApi(
        userId,
        currentConversation!._id
      );
      socket.emit('change-group-info', currentUser, conversation, message);
      setConversations((prev) => prev.map((c) => (c._id === conversation._id ? conversation : c)));
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleAddUsersToGroup = async (members: string[]) => {
    try {
      const { conversation, message } = await addUserToGroupConversationApi(
        members,
        currentConversation!._id
      );
      socket.emit('change-group-info', currentUser, conversation, message);
      setConversations((prev) => prev.map((c) => (c._id === conversation._id ? conversation : c)));
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <div className={`messagesPage ${isDarkMode ? 'dark' : ''}`}>
        <div className="messagesPage-wrapper">
          <SidebarMessagePage
            setIsShowCreateGroupChatModal={setIsShowCreateGroupChatModal}
            handleCreateSingleConversation={handleCreateSingleConversation}
            conversations={conversations}
            conversationNotSeenList={conversationNotSeenList}
            className={isShowRightBar ? 'hide' : ''}
          />
          <div className="messagesPage-wrapper-center">
            {currentConversation && (
              <div className="messagesPage-wrapper-center-top">
                <div className="messagesPage-wrapper-center-top-left">
                  <Avatar src={avatarOfConversation} />
                  <h3>{nameOfConversation}</h3>
                </div>
                <div className="messagesPage-wrapper-center-top-right">
                  <div
                    className="messagesPage-wrapper-center-top-right-icon"
                    onClick={() => setIsShowRightBar((prev) => !prev)}
                  >
                    <BsThreeDots />
                  </div>
                </div>
              </div>
            )}
            {currentConversation ? (
              <ChatBox
                setConversations={setConversations}
                currentConversation={currentConversation}
                setConversationNotSeenList={setConversationNotSeenList}
                conversationNotSeenList={conversationNotSeenList}
              />
            ) : (
              <p className="no-conversation">Please choose one Conversation to chat</p>
            )}
            {!isLoading && conversations.length === 0 && (
              <p className="no-conversation">No Conversation</p>
            )}
          </div>

          {isShowRightBar && (
            <RightbarMessagePage
              avatarOfConversation={avatarOfConversation}
              nameOfConversation={nameOfConversation}
              currentConversation={currentConversation}
              handleChangeChatName={handleChangeChatName}
              handlePhotoGroupChange={handlePhotoGroupChange}
              handleLeaveGroup={handleLeaveGroup}
              handleRemoveUserFromGroup={handleRemoveUserFromGroup}
              handleAddUsersToGroup={handleAddUsersToGroup}
            />
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
