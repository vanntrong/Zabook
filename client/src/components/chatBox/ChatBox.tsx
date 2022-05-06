import { createMessageApi, getMessagesApi } from 'api/messageApi';
import TypingAnimation from 'components/loadings/typingAnimation/TypingAnimation';
import Message from 'components/message/Message';
import React, { FC, useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { conversationType, messageType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectSocket } from 'store/slice/socketSlice';
import { selectCurrentUser } from 'store/slice/userSlice';
import './chatBox.scss';

interface ChatBoxProps {
  setConversations: React.Dispatch<React.SetStateAction<conversationType[]>>;
  currentConversation: conversationType;
}

const ChatBox: FC<ChatBoxProps> = ({ setConversations, currentConversation }) => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const currentUser = useAppSelector(selectCurrentUser);
  const [messageContent, setMessageContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef<any>(null);
  const params = useParams();
  const { conversationId } = params;
  const socket = useAppSelector(selectSocket);

  useEffect(() => {
    socket?.emit('join chat', conversationId);
    socket?.on('typing', () => setIsTyping(true));
    socket?.on('stop typing', () => setIsTyping(false));
  }, [socket, conversationId]);

  useEffect(() => {
    socket?.on('getMessage', (data: { message: messageType; conversation: conversationType }) => {
      console.log('getMessage', data);
      setMessages((prev) => [data.message, ...prev]);
    });
  }, [socket]);

  useEffect(() => {
    const getMessages = async () => {
      if (conversationId) {
        const res = await getMessagesApi(conversationId);
        setMessages(res);
      }
    };
    getMessages();
  }, [conversationId]);

  const handleChangeMessageText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageContent(e.target.value);
    socket?.emit('typing', conversationId);
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
      if (res) {
        setMessages((prev) => [res, ...prev]);
        setConversations((prev) =>
          prev.map((c) => (c._id === conversationId ? { ...c, lastMessage: res } : c))
        );
        socket?.emit('newMessage', { message: res, conversation: currentConversation });
      }
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

          {messages.length === 0 && (
            <p className="no-message">No message recently. Start chatting now.</p>
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
    </>
  );
};

export default React.memo(ChatBox);
