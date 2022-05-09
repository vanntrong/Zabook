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
import { BiImageAdd } from 'react-icons/bi';
import './chatBox.scss';
import { convertFileSize } from 'utils/upload';
import { toast } from 'react-toastify';

interface ChatBoxProps {
  setConversations: React.Dispatch<React.SetStateAction<conversationType[]>>;
  setConversationNotSeenList: React.Dispatch<React.SetStateAction<string[]>>;
  conversationNotSeenList: string[];
  currentConversation: conversationType;
}

const ChatBox: FC<ChatBoxProps> = ({
  setConversations,
  currentConversation,
  setConversationNotSeenList,
  conversationNotSeenList,
}) => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const currentUser = useAppSelector(selectCurrentUser);
  const [messageContent, setMessageContent] = useState('');
  const [isFetchingMessage, setIsFetchingMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef<any>(null);
  const params = useParams();
  const { conversationId } = params;
  const selectConversationId = useRef<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

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
      if (!selectConversationId || selectConversationId.current !== data.conversation) {
        // notification login
        setConversationNotSeenList((prev) => [data.conversation, ...prev]);
      } else {
        setMessages((prev) => [data, ...prev]);
      }
      setConversations((prev) =>
        prev.map((c) => (c._id === data.conversation ? { ...c, lastMessage: data } : c))
      );
      setConversations((prev) =>
        prev.sort((a, b) =>
          a._id === data.conversation ? -1 : b._id === data.conversation ? 1 : 0
        )
      );
    });
  }, [setConversations, setConversationNotSeenList]);

  useEffect(() => {
    const getMessages = async () => {
      setIsFetchingMessage(true);
      if (conversationId) {
        selectConversationId.current = conversationId;
        const res = await getMessagesApi(conversationId);
        setMessages(res);
        if (conversationNotSeenList.includes(conversationId)) {
          setConversationNotSeenList((prev) => prev.filter((c) => c !== conversationId));
        }
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
    if (messageContent.trim().length === 0) {
      return;
    }
    if (conversationId) {
      const textData = messageContent;
      setMessageContent('');
      const res = await createMessageApi({ content: textData, conversationId });
      socket.emit('newMessage', res, currentConversation);
      setMessages((prev) => [res, ...prev]);
      setConversations((prev) =>
        prev.map((c) => (c._id === res.conversation ? { ...c, lastMessage: res } : c))
      );
      setConversations((prev) =>
        prev.sort((a, b) => (a._id === res.conversation ? -1 : b._id === res.conversation ? 1 : 0))
      );
    }
  };

  const handleChangeInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && conversationId) {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileSize = convertFileSize(file.size);
        const media_type = file.type.split('/')[0];

        if (media_type === 'image' && fileSize > 10) {
          toast.error('Image size must be less than 10MB');
          return;
        }

        if (media_type === 'video' && fileSize > 100) {
          toast.error('Video size must be less than 100MB');
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const url = reader.result as string;
          const res = await createMessageApi({ asset: { url, media_type }, conversationId });
          socket.emit('newMessage', res, currentConversation);
          setMessages((prev) => [res, ...prev]);
          setConversations((prev) =>
            prev.map((c) => (c._id === res.conversation ? { ...c, lastMessage: res } : c))
          );
          setConversations((prev) =>
            prev.sort((a, b) =>
              a._id === res.conversation ? -1 : b._id === res.conversation ? 1 : 0
            )
          );
        };
      }
    }
  };

  useEffect(() => {}, []);

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
          <div className="chatBox-input-assets">
            <div
              className="chatBox-input-assets-icon"
              onClick={() => inputFileRef.current?.click()}
            >
              <BiImageAdd />
            </div>
            <input
              type="file"
              hidden
              accept="image/*,video/*"
              ref={inputFileRef}
              onChange={handleChangeInputFile}
            />
          </div>
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
