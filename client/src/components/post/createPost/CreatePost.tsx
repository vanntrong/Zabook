import { Avatar } from '@mui/material';
import React, { FC } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { BiImage } from 'react-icons/bi';
import { BsCameraVideo, BsPencil, BsThreeDots } from 'react-icons/bs';
import { PostType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import { selectCurrentUser } from 'store/slice/userSlice';
import Backdrop from '../../backdrop/Backdrop';
import InputPostModal from './../../input/InputPost/inputPostModal/InputPostModal';
import './createPost.scss';

interface CreatePostProps {
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
}

const CreatePost: FC<CreatePostProps> = ({ setPosts }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isShowCreatePostModal, setIsShowCreatePostModal] = React.useState(false);
  const isDarkMode = useAppSelector(selectTheme);
  return (
    <>
      <div className={`createPost ${isDarkMode ? 'dark' : ''}`}>
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
        <InputPostModal setIsShowPostModal={setIsShowCreatePostModal} setPosts={setPosts} />
      )}
      <Backdrop isShow={isShowCreatePostModal} setIsShow={setIsShowCreatePostModal} />
    </>
  );
};

export default CreatePost;
