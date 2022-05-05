import { Avatar } from '@mui/material';
import ChatBox from 'components/chatBox/ChatBox';
import Conversations from 'components/conversations/Conversations';
import React, { useRef, useState } from 'react';
import { AiOutlineEdit, AiOutlineSearch } from 'react-icons/ai';
import { BsFillCameraVideoFill, BsThreeDots } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { HiPhotograph } from 'react-icons/hi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoCreateOutline } from 'react-icons/io5';
import CreateGroupChatModal from './../../components/modal/createGroupChatModal/CreateGroupChatModal';
import './messagesPage.scss';

const MessagesPage = () => {
  const [isShowRightBar, setIsShowRightBar] = useState(true);
  const [isShowChangeChatName, setIsShowChangeChatName] = useState(false);
  const photoGroupRef = useRef<HTMLInputElement>(null);

  const handleChangePhotoClick = () => {
    photoGroupRef.current?.click();
  };

  const handlePhotoGroupChange = () => {
    console.log('photoGroupRef.current?.files', photoGroupRef.current?.files);
  };

  const handleLeaveGroup = () => {
    console.log('leave group');
  };
  return (
    <>
      <div className="messagesPage">
        <div className="messagesPage-wrapper">
          <div className="messagesPage-wrapper-left">
            <div className="messagesPage-wrapper-left-top">
              <Avatar className="messagesPage-wrapper-left-top-avatar" />
              <h4 className="messagesPage-wrapper-left-top-title">Chats</h4>
              <div className="messagesPage-wrapper-left-top-button">
                <IoCreateOutline />
              </div>
            </div>
            <div className="messagesPage-wrapper-left-input-search">
              <AiOutlineSearch />
              <input type="text" placeholder="Search Messenger" />
            </div>
            <Conversations />
          </div>
          <div className="messagesPage-wrapper-center">
            <div className="messagesPage-wrapper-center-top">
              <div className="messagesPage-wrapper-center-top-left">
                <Avatar />
                <h3>Jonas</h3>
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
            <ChatBox />
          </div>
          {isShowRightBar && (
            <div className="messagesPage-wrapper-right">
              <div className="messagesPage-wrapper-right-top">
                <Avatar className="messagesPage-wrapper-right-avatar" />
                <h3>Jonas</h3>
              </div>
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
                    <form>
                      <input type="text" placeholder="Enter new chat name" />
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
                <div className="messagesPage-wrapper-right-options-item" onClick={handleLeaveGroup}>
                  <FiLogOut />
                  <span>Leave group</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <CreateGroupChatModal /> */}
    </>
  );
};

export default MessagesPage;
