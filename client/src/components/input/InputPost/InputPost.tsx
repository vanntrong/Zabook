import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Avatar from '@mui/material/Avatar';
import { createPostApi } from 'api/postApi';
import Backdrop from 'components/Backdrop';
import Notification from 'components/Notification';
// import PostAssets from 'components/post/PostAssets';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React, { FC, useState } from 'react';
import { formPostData } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import { uploadFile } from 'utils/upload';
import './inputpost.scss';

interface InputPostProps {
  className?: string;
}

const InputPost: FC<InputPostProps> = ({ className }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isShowModalPost, setIsShowModalPost] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<string>('');
  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState<boolean>(false);
  const [isSubmitForm, setIsSubmitForm] = useState<boolean>(false);
  const [files, setFiles] = useState<any>([]);

  const selectEmojiHandler = (emoji: any) => {
    setPostContent(postContent + emoji.native);
  };

  const hideModalPost = () => {
    setIsShowModalPost(false);
    setPostContent('');
    setFiles([]);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitForm(true);
    hideModalPost();
    const data: formPostData = {
      userPost: currentUser!._id,
      content: postContent,
    };
    if (files.length > 0) {
      const { length, ...other } = files; // get rid of length property
      const filesData: File[] = Object.values({ ...other }); //convert object files to array
      try {
        data.assets = await Promise.all(
          filesData.map(async (file: File) => {
            return uploadFile(file).then((data) => ({
              url: data.url,
              media_type: data.resource_type,
            }));
          })
        );
      } catch (error) {
        alert('Error when upload file');
      }
    }
    await createPostApi(data);
  };
  return (
    <>
      <div className={`form-post ${className ? className : ''}`}>
        <div className="user-image">
          <Avatar src={currentUser?.avatar} alt="" />
        </div>
        <div className="form-post__group">
          <div className="form-post__input" onClick={() => setIsShowModalPost(true)}>
            {`What's on your mind, ${currentUser?.lastName}? `}
          </div>
          <div className="form-input__image">
            <ImageOutlinedIcon className="form-post__icon" />
            <PersonOutlineOutlinedIcon className="form-post__icon" />
            <EmojiEmotionsOutlinedIcon className="form-post__icon" />
          </div>
        </div>
      </div>
      {isShowModalPost && (
        <form className="form-post-modal" onSubmit={submitHandler}>
          <div className="form-post-title">
            <h2>Create post</h2>
            <div onClick={() => hideModalPost()} style={{ cursor: 'pointer' }}>
              <Avatar>
                <CloseIcon />
              </Avatar>
            </div>
          </div>
          <hr />
          <div className="form-post-feature">
            <div className="form-post-user">
              <Avatar src={currentUser?.avatar} alt="" />
              <div className="form-post-user-info">
                <h3>{currentUser?.fullName}</h3>
              </div>
            </div>
            <div className="form-post-content">
              <textarea
                // cols={30}
                rows={5}
                placeholder="What's on your mind, Trong?"
                autoFocus
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              ></textarea>
            </div>
            <div className="emoji-picker">
              <div
                onClick={() => setIsShowEmojiPicker(!isShowEmojiPicker)}
                style={{ cursor: 'pointer' }}
              >
                <EmojiEmotionsOutlinedIcon htmlColor="#d3d8e0" fontSize="medium" />
              </div>
              {isShowEmojiPicker && (
                <Picker
                  onSelect={selectEmojiHandler}
                  theme="light"
                  set="facebook"
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    transform: 'translateY(-105%)',
                  }}
                  showPreview={false}
                  showSkinTones={false}
                />
              )}
            </div>
            {/* <div className="assets-preview">
              <PostAssets assets={assetsTest} />
            </div> */}
            <div className="form-post-assets">
              <h4>Add to your post</h4>
              <div className="form-post-assets-item">
                <label htmlFor="file" style={{ cursor: 'pointer', fontSize: '35px' }}>
                  <AddPhotoAlternateIcon htmlColor="#2d6a4f" fontSize="inherit" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  hidden
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
            </div>
            <button type="submit" disabled={postContent.length === 0} className="form-post-submit">
              Post
            </button>
          </div>
        </form>
      )}
      {isSubmitForm && <Notification type="success" content="Your post is being on process..." />}
      <Backdrop isShow={isShowModalPost} setIsShow={setIsShowModalPost} color="#fff" />
    </>
  );
};

export default InputPost;
