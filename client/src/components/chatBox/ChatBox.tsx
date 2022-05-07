import { Avatar } from '@mui/material';
import { createMessageApi, getMessagesApi } from 'api/messageApi';
import ProgressLoading from 'components/loadings/progressLoading/ProgressLoading';
import TypingAnimation from 'components/loadings/typingAnimation/TypingAnimation';
import Message from 'components/message/Message';
import React, { FC, useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { conversationType, messageType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import { socket } from 'utils/socket';
import './chatBox.scss';

interface ChatBoxProps {
  setConversations: React.Dispatch<React.SetStateAction<conversationType[]>>;
  currentConversation: conversationType;
}

const ChatBox: FC<ChatBoxProps> = ({ setConversations, currentConversation }) => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const currentUser = useAppSelector(selectCurrentUser);
  const [messageContent, setMessageContent] = useState('');
  const [isFetchingMessage, setIsFetchingMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef<any>(null);
  const params = useParams();
  const { conversationId } = params;
  const selectConversationId = useRef<string>('');

  useEffect(() => {
    socket.emit('join chat', conversationId);
  }, [conversationId]);

  useEffect(() => {
    socket.on('typing', (conversationId) => {
      if (conversationId === selectConversationId.current) {
        setIsTyping(true);
      } else return;
    });
    socket.on('stop typing', (conversationId) => {
      if (conversationId === selectConversationId.current) {
        setIsTyping(false);
      } else return;
    });
  }, []);

  useEffect(() => {
    socket.on('getMessage', (data) => {
      if (selectConversationId.current === data.conversation) {
        setMessages((prev) => [data, ...prev]);
      } else {
        return;
      }
    });
  }, []);

  // useEffect(() => {
  //   socket.on('get-group-avatar-change', (data) => {
  //     if (selectConversationId.current === data.group._id) {
  //       setNotifications((prev) => [{ message: data.message, avatar: data.group.avatar }, ...prev]);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const getMessages = async () => {
      setIsFetchingMessage(true);
      if (conversationId) {
        selectConversationId.current = conversationId;
        const res = await getMessagesApi(conversationId);
        setMessages(res);
      }
      setIsFetchingMessage(false);
    };
    getMessages();
  }, [conversationId]);

  const handleChangeMessageText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageContent(e.target.value);
    socket.emit('typing', conversationId);
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(() => {
      socket?.emit('stop typing', conversationId);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (conversationId) {
      const res = await createMessageApi(conversationId, messageContent);
      socket.emit('newMessage', res);
      setMessages((prev) => [res, ...prev]);
      setConversations((prev) =>
        prev.map((c) => (c._id === conversationId ? { ...c, lastMessage: res } : c))
      );
    }
    setMessageContent('');
  };

  return (
    <>
      <div className="chatBox">
        <div className="chatBox-messages">
          {isTyping && <TypingAnimation />}
          {messages.length > 0 &&
            messages.map((message) => (
              <>
                <Message
                  message={message}
                  isRightMessage={currentUser?._id === message.sender._id}
                  key={message._id}
                  setMessages={setMessages}
                />
              </>
            ))}

          {!isFetchingMessage && messages.length === 0 && (
            <>
              <p className="no-message">No message recently. Start chatting now.</p>
            </>
          )}
        </div>
        <div className="chatBox-input">
          <form onSubmit={handleSubmit}>
            <input placeholder="Aa" value={messageContent} onChange={handleChangeMessageText} />
            <button type="submit">
              <FiSend />
            </button>
          </form>
        </div>
      </div>
      {isFetchingMessage && <ProgressLoading />}
    </>
  );
};

export default React.memo(ChatBox);
