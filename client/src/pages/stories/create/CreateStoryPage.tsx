import { Avatar } from '@mui/material';
import Navbar from 'components/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';
import './createStoryPage.scss';

import { IoMdPhotos } from 'react-icons/io';
import { IoTextSharp } from 'react-icons/io5';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import { createStoryApi } from 'api/storyApi';
import ProgressLoading from 'components/loadings/progressLoading/ProgressLoading';

export interface formSubmitStoryType {
  userPost: string;
  asset?: string;
  content?: string;
}

const CreateStoryPage = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);
  const [file, setFile] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
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
      setFile(reader.result as string);
      setFilePreview(reader.result as string);
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
              <h3 className="createStoryPage-name">Vo Van Trong</h3>
            </div>
          </div>
          <hr />
          {isShowPreview && (
            <div className="createStoryPage-button">
              <button className="createStoryPage-button-cancel">Discard</button>
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
                  accept="image/*"
                  multiple={false}
                  id="image"
                  hidden
                  onChange={handleChangeFile}
                />
                <div className="createStoryPage-choose-item-icon">
                  <IoMdPhotos />
                </div>
                <p className="createStoryPage-choose-item-text">Create a photo story</p>
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
                {filePreview && <img src={filePreview} alt="" />}
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
