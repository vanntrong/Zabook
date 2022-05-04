import { Avatar } from '@mui/material';
import { deleteStoryApi, getAllStoriesOfOneUserApi, viewStoryApi } from 'api/storyApi';
import Backdrop from 'components/backdrop/Backdrop';
import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';
import PopUp from 'components/popup/PopUp';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import { storyType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import { Autoplay, Keyboard, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import './storyPlayer.scss';

interface StoryPlayerProps {
  userPost: string;
}
const StoryPlayer: FC<StoryPlayerProps> = ({ userPost }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [stories, setStories] = useState<storyType[]>([]);
  const [isFetchingStory, setIsFetchingStory] = useState<boolean>(false);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [isShowStoryMenu, setIsShowStoryMenu] = useState<boolean>(false);
  const [currentStoryId, setCurrentStoryId] = useState<string>('');
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);

  useEffect(() => {
    const getStoriesApi = async () => {
      setIsFetchingStory(true);
      const res = await getAllStoriesOfOneUserApi({ userPost: userPost });
      setStories(res);
      setCurrentStoryId(res[0]._id);
      setIsFetchingStory(false);
    };
    getStoriesApi();
  }, [userPost]);

  const viewStoryHandler = async (storyId: string) => {
    try {
      const res = await viewStoryApi(storyId);
      return res;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSwiperChange = async (e: any) => {
    const timingElements = document.querySelectorAll('.story-player-timings-item');
    timingElements.forEach((item) => {
      item.classList.remove('active');
    });
    const index = e.activeIndex; //get index by swiper slider
    timingElements[index].classList.add('active');
    setCurrentStoryId(stories[index]._id);
    setCurrentStoryIndex(index);
  };

  const deleteStoryHandler = async (id: string) => {
    try {
      const res = await deleteStoryApi(id);

      setStories((prevState) => prevState.filter((story) => story._id !== res._id));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const onClosePopup = () => {
    setIsOpenPopup(false);
  };

  const onConfirmPopup = async () => {
    await deleteStoryHandler(currentStoryId);
    onClosePopup();
  };

  useEffect(() => {
    const handleViewStory = async () => {
      if (!stories[currentStoryIndex].views.includes(currentUser!._id)) {
        const newStory = await viewStoryHandler(stories[currentStoryIndex]._id);
        if (newStory) {
          setStories((prevState) =>
            prevState.filter((story) => (story._id === newStory._id ? newStory : story))
          );
        }
      } else {
        return;
      }
    };
    handleViewStory();
  }, [currentStoryIndex, currentUser, stories]);

  return (
    <>
      {isFetchingStory && <SkeletonLoading type="story" />}
      {!isFetchingStory && stories.length > 0 && (
        <div className="story-player">
          <div className="story-player-info">
            <div className="story-player-timings">
              {stories.length > 0 &&
                stories.map((story, index) => (
                  <div
                    key={index}
                    className={`story-player-timings-item ${index === 0 ? 'active' : ''}`}
                    style={{ '--timing': `${story.timing * 1000}ms` } as React.CSSProperties}
                  ></div>
                ))}
            </div>
          </div>
          <Swiper
            slidesPerView={1}
            onSlideChange={handleSwiperChange}
            modules={[Navigation, Autoplay, Keyboard]}
            navigation
            autoplay={{
              delay: 10000,
              stopOnLastSlide: true,
              // disableOnInteraction: false,
              // pauseOnMouseEnter: true,
            }}
            keyboard={true}
          >
            {stories.length > 0 &&
              stories.map((story) => (
                <SwiperSlide key={story._id}>
                  <div className="story-player-user">
                    <Avatar
                      className={`story-player-user-avatar ${
                        story.views.includes(currentUser!._id) ? 'seen' : 'not-seen'
                      }`}
                      src={story.userPost?.avatar}
                      alt={story.userPost?.fullName}
                    />
                    <div className="story-player-user-name">
                      <p>{story.userPost?.fullName}</p>
                      <span>{moment(story.createdAt).fromNow()}</span>
                    </div>
                    {currentUser?._id === story.userPost?._id && (
                      <>
                        <div
                          className="story-player-setting"
                          onClick={() => setIsShowStoryMenu((prev) => !prev)}
                        >
                          <BsThreeDots />

                          {isShowStoryMenu && (
                            <div className="story-player-menu">
                              <div
                                className="story-player-menu-item"
                                onClick={() => setIsOpenPopup(true)}
                              >
                                <MdDeleteOutline />
                                <span>Delete Story</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  <div
                    className="story-player-wrapper"
                    style={{
                      backgroundImage: `url('${story.asset}')`,
                    }}
                  ></div>
                  {currentUser?._id === story.userPost?._id && (
                    <div className="story-player-view-count">
                      <p>{story.views.length} views</p>
                    </div>
                  )}
                </SwiperSlide>
              ))}
          </Swiper>
          <PopUp
            type="story"
            isOpen={isOpenPopup}
            onClose={onClosePopup}
            onConfirm={onConfirmPopup}
          />
          <Backdrop isShow={isOpenPopup} setIsShow={setIsOpenPopup} color="#fff" opacity={0.6} />
        </div>
      )}
    </>
  );
};

export default StoryPlayer;
