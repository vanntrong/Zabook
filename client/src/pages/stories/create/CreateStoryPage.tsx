import { Avatar } from '@mui/material';
import { createStoryApi } from 'api/storyApi';
import ProgressLoading from 'components/loadings/progressLoading/ProgressLoading';
import Navbar from 'components/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { IoMdPhotos } from 'react-icons/io';
import { IoTextSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import './createStoryPage.scss';
import { Player } from 'react-tuby';
import 'react-tuby/css/main.css';
export interface formSubmitStoryType {
  userPost: string;
  asset?: { media_type: string; url: string };
  content?: string;
}

const CreateStoryPage = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);
  const [file, setFile] = useState<{ media_type: string; url: string } | null>(null);
  const [filePreview, setFilePreview] = useState<{ media_type: string; url: string } | null>(null);
  const [content, setContent] = useState('');
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Create Story | Sociala.';
  }, []);

  const handleAddFileClick = () => {
    const input = document.querySelector('#image') as HTMLInputElement;
    input!.click();
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const media_type = file.type.split('/')[0];
      const url = reader.result as string;
      setFile({ media_type, url });
      setFilePreview({ media_type, url });
    };
    setIsShowPreview(true);
  };

  const submitHandler = async () => {
    setIsPending(true);
    const data: formSubmitStoryType = {
      userPost: currentUser!._id,
    };
    if (file) {
      data.asset = file;
    }
    if (content.trim().length > 0) {
      data.content = content;
    }
    const res = await createStoryApi(data);
    setIsPending(false);
    setFile(null);
    setFilePreview(null);
    if (res) {
      navigate('/');
    }
  };

  return (
    <>
      <Navbar />
      <div className="createStoryPage">
        <div className="createStoryPage-sidebar">
          <div className="createStoryPage-sidebar-top">
            <h1 className="createStoryPage-title">Your story</h1>
            <div className="createStoryPage-info">
              <Avatar className="createStoryPage-avatar" src="" alt="" />
              <h3 className="createStoryPage-name">{currentUser?.fullName}</h3>
            </div>
          </div>
          <hr />
          {isShowPreview && (
            <div className="createStoryPage-button">
              <button className="createStoryPage-button-cancel" onClick={() => navigate(-1)}>
                Discard
              </button>
              <button className="createStoryPage-button-confirm" onClick={submitHandler}>
                Share to story
              </button>
            </div>
          )}
        </div>
        <div className="createStoryPage-main">
          {!isShowPreview ? (
            <div className="createStoryPage-choose">
              <div
                className="createStoryPage-choose-item createStoryPage-choose-item-photo"
                onClick={handleAddFileClick}
              >
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple={false}
                  id="image"
                  hidden
                  onChange={handleChangeFile}
                />
                <div className="createStoryPage-choose-item-icon">
                  <IoMdPhotos />
                </div>
                <p className="createStoryPage-choose-item-text">Create a media story</p>
              </div>
              <div className="createStoryPage-choose-item createStoryPage-choose-item-text">
                <div className="createStoryPage-choose-item-icon">
                  <IoTextSharp />
                </div>
                <p className="createStoryPage-choose-item-text">Create a text story</p>
              </div>
            </div>
          ) : (
            <div className="createStoryPage-preview">
              <h3>Preview</h3>
              <div className="createStoryPage-preview-container">
                {filePreview && filePreview.media_type === 'image' && (
                  <img src={filePreview.url} alt="" />
                )}
                {filePreview && filePreview.media_type === 'video' && (
                  <Player src={filePreview.url} dimensions={{ width: '100%', height: '100%' }}>
                    {(ref, props) => <video ref={ref} {...props} autoPlay loop />}
                  </Player>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {isPending && <ProgressLoading />}
    </>
  );
};

export default CreateStoryPage;
