import { Avatar } from '@mui/material';
import React from 'react';

import { BsPencil } from 'react-icons/bs';
import { BsCameraVideo } from 'react-icons/bs';
import { BiImage } from 'react-icons/bi';
import { AiOutlineCamera } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';

import './createPost.scss';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import InputPostModal from './../../input/InputPost/inputPostModal/InputPostModal';
import Backdrop from '../../backdrop/Backdrop';
import Notification from 'components/notification/Notification';

const CreatePost = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isShowCreatePostModal, setIsShowCreatePostModal] = React.useState(false);
  const [isShowNotification, setIsShowNotification] = React.useState(false);
  return (
    <>
      <div className="createPost">
        <div className="createPost-top" onClick={() => setIsShowCreatePostModal(true)}>
          <div className="createPost-top-icon">
            <BsPencil />
          </div>
          <span>Create Post</span>
        </div>
        <div className="createPost-center">
          <div className="createPost-text-container">
            <Avatar className="createPost-user-avatar" src={currentUser?.avatar} alt="" />
            <textarea
              cols={30}
              rows={8}
              placeholder="What's on your mind?"
              onClick={() => setIsShowCreatePostModal(true)}
            ></textarea>
          </div>
        </div>
        <div className="createPost-bottom">
          <div className="createPost-assets">
            <div
              className="createPost-assets-item createPost-assets-item-1"
              onClick={() => setIsShowCreatePostModal(true)}
            >
              <BsCameraVideo />
              <span>Live Video</span>
            </div>
            <div
              className="createPost-assets-item createPost-assets-item-2"
              onClick={() => setIsShowCreatePostModal(true)}
            >
              <BiImage />
              <span>Photo/Video</span>
            </div>
            <div
              className="createPost-assets-item createPost-assets-item-3"
              onClick={() => setIsShowCreatePostModal(true)}
            >
              <AiOutlineCamera />
              <span>Feeling/Activity</span>
            </div>
          </div>
          <div className="createPost-setting">
            <BsThreeDots />
          </div>
        </div>
      </div>
      {isShowCreatePostModal && (
        <InputPostModal
          currentUser={currentUser}
          setIsShowPostModal={setIsShowCreatePostModal}
          setIsShowNotification={setIsShowNotification}
        />
      )}
      <Backdrop isShow={isShowCreatePostModal} setIsShow={setIsShowCreatePostModal} />
      {isShowNotification && (
        <Notification type="success" content="Your post is being on progress" />
      )}
    </>
  );
};

export default CreatePost;
