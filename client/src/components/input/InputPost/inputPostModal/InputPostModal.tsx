import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import Avatar from '@mui/material/Avatar';
import { searchUserApi } from 'api/userApi';
import DragImage from 'components/dragImage/DragImage';
import ProgressLoading from 'components/loadings/progressLoading/ProgressLoading';
import { searchResult } from 'components/searchResultModal/SearchResultModal';
import { Picker } from 'emoji-mart';
import React, { FC, useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { FaUserPlus } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
import { formPostData, UserType } from 'shared/types';
import { useAppDispatch } from 'store/hooks';
import { postAction } from 'store/slice/postSlice';
import '../inputpost.scss';

interface SearchPeopleToTagProps {
  currentUser: UserType | null;
  onClose: () => void;
  setTagsPeople: React.Dispatch<React.SetStateAction<string[]>>;
}

const SearchPeopleToTag: FC<SearchPeopleToTagProps> = ({ onClose, currentUser, setTagsPeople }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<searchResult[]>([]);
  const [tagsPeoplePreview, setTagsPeoplePreview] = useState<{ name: string; id: string }[]>([]);
  const typingTimeout = useRef<any>(null);

  useEffect(() => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(async () => {
      if (searchText.trim().length === 0) {
        setSearchResult([]);
      } else {
        const params = {
          q: searchText,
          limit: 10,
        };
        const res = await searchUserApi(params);
        setSearchResult(res);
      }
    }, 300);
  }, [searchText]);

  const handleClickResult = (user: any) => {
    if (tagsPeoplePreview.includes(user._id)) {
      return;
    }
    setTagsPeoplePreview([...tagsPeoplePreview, { id: user._id, name: user.fullName }]);
    setTagsPeople((prev) => [...prev, user._id]);
    setSearchResult([]);
  };

  const handleClickDelete = (id: string) => {
    setTagsPeoplePreview((prev) => prev.filter((tag) => tag.id !== id));
    setTagsPeople((prev) => prev.filter((tag) => tag !== id));
  };
  return (
    <div className="inputPostSearchPeople">
      <div className="inputPostSearchPeople-top">
        <div onClick={onClose}>
          <Avatar className="inputPostSearchPeople-top-close">
            <IoArrowBackOutline />
          </Avatar>
        </div>
        <h3>Tag people</h3>
      </div>
      <hr />
      <div className="inputPostSearchPeople-center">
        <div className="inputPostSearchPeople-input">
          <AiOutlineSearch />
          <input
            type="text"
            placeholder="Search for friends"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <button className="inputPostSearchPeople-button" onClick={onClose}>
          Done
        </button>
      </div>
      <div className="inputSearchPeopleResults">
        {tagsPeoplePreview.length > 0 && (
          <div className="tagPeople-list">
            {tagsPeoplePreview.map((item, index) => (
              <div className="tagPeople-item" key={index}>
                <h4>{item.name}</h4>
                <button onClick={() => handleClickDelete(item.id)}>
                  <AiOutlineClose />
                </button>
              </div>
            ))}
          </div>
        )}

        {searchResult.length === 0 && <p>No people found</p>}

        {searchResult.length > 0 &&
          searchResult.map(
            (user) =>
              user._id !== currentUser!._id && (
                <div className="result" onClick={() => handleClickResult(user)} key={user._id}>
                  <div className="result-info">
                    <Avatar src={user.avatar} alt={user.fullName} />
                    <div className="result-info__name">{user.fullName}</div>
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

interface InputPostModalProps {
  currentUser: UserType | null;
  setIsShowPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputPostModal: FC<InputPostModalProps> = ({
  currentUser,
  setIsShowPostModal,
  setIsShowNotification,
}) => {
  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [filesPreview, setFilesPreview] = useState<any[]>([]);
  const [assetsData, setAssetsData] = useState<any[]>([]);
  const [isShowDragAndDrop, setIsShowDragAndDrop] = useState<boolean>(false);
  const [isShowSearchTagPeople, setIsShowSearchTagPeople] = useState<boolean>(false);
  const [tagsPeople, setTagsPeople] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const selectEmojiHandler = (emoji: any) => {
    setPostContent(postContent + emoji.native);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    const data: formPostData = {
      userPost: currentUser!._id,
      content: postContent,
      tagsPeople,
    };
    if (assetsData.length > 0) {
      data.assets = assetsData;
    }
    dispatch(postAction.createNewPostRequest(data));
    setPostContent('');
    const timer = setTimeout(() => {
      setIsSubmit(false);
      setIsShowPostModal(false);
      setIsShowNotification(true);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  };

  const hideButtonClickHandler = () => {
    setIsShowPostModal(false);
    setPostContent('');
  };

  const showDragAndDrop = () => {
    setIsShowDragAndDrop((prev) => !prev);
  };

  const changFilesHandler = (files: any[]) => {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const media_type = file.type.split('/')[0];
          const url = reader.result;
          setAssetsData((prev) => [...prev, { media_type, url }]);
          setFilesPreview((prev) => [...prev, reader.result]);
        };
      }
    }
  };

  const handleCloseSearchTagPeople = () => {
    setIsShowSearchTagPeople(false);
  };
  return (
    <>
      <form className="form-post-modal" onSubmit={submitHandler}>
        <div className="form-post-title">
          <h2>Create post</h2>
          <div onClick={hideButtonClickHandler} style={{ cursor: 'pointer' }}>
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
              rows={5}
              placeholder={`What's on your mind, ${currentUser?.lastName}?`}
              autoFocus
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
          </div>
          {isShowDragAndDrop && (
            <div className="drag-drop-container">
              <DragImage changFilesHandler={changFilesHandler} filesPreview={filesPreview} />
            </div>
          )}

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
          {filesPreview.length > 0 && <div className="assets-preview"></div>}

          <div className="form-post-assets">
            <h4>Add to your post</h4>
            <div className="form-post-assets-item">
              <div style={{ cursor: 'pointer', fontSize: '35px' }}>
                <AddPhotoAlternateIcon
                  htmlColor="#2d6a4f"
                  fontSize="inherit"
                  onClick={() => showDragAndDrop()}
                />
              </div>
              <div style={{ cursor: 'pointer', fontSize: '35px' }}>
                <FaUserPlus
                  color="#05f"
                  fontSize="inherit"
                  onClick={() => setIsShowSearchTagPeople(true)}
                />
              </div>
            </div>
          </div>
          <button type="submit" disabled={postContent.length === 0} className="form-post-submit">
            Post
          </button>
        </div>
      </form>
      {isShowSearchTagPeople && (
        <SearchPeopleToTag
          onClose={handleCloseSearchTagPeople}
          currentUser={currentUser}
          setTagsPeople={setTagsPeople}
        />
      )}

      {isSubmit && <ProgressLoading />}
    </>
  );
};
export default InputPostModal;
