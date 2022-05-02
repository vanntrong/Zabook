import { Avatar } from '@mui/material';
import { getAllStoriesOfOneUserApi } from 'api/storyApi';
import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { storyType } from 'shared/types';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import './storyPlayer.scss';

interface StoryPlayerProps {
  userPost: string;
}
const StoryPlayer: FC<StoryPlayerProps> = ({ userPost }) => {
  const [stories, setStories] = useState<storyType[]>([]);
  const [isFetchingStory, setIsFetchingStory] = useState<boolean>(false);

  useEffect(() => {
    const getStoriesApi = async () => {
      const res = await getAllStoriesOfOneUserApi({ userPost: userPost });
      setStories(res);
      console.log(res);
      setIsFetchingStory(false);
    };
    getStoriesApi();
  }, [userPost]);

  const handleSwiperChange = (e: any) => {
    const timingElements = document.querySelectorAll('.story-player-timings-item');
    timingElements.forEach((item) => {
      item.classList.remove('active');
    });
    const index = e.activeIndex; //get index by swiper slider
    timingElements[index].classList.add('active');
  };

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
            <div className="story-player-user">
              <Avatar
                className="story-player-user-avatar"
                src={stories[0].userPost?.avatar}
                alt={stories[0].userPost?.fullName}
              />
              <div className="story-player-user-name">
                <p>{stories[0].userPost?.fullName}</p>
                <span>{moment(stories[0].createdAt).fromNow()}</span>
              </div>
            </div>
          </div>
          <Swiper
            slidesPerView={1}
            onSlideChange={handleSwiperChange}
            modules={[Navigation]}
            navigation
            autoplay={{
              delay: 10 * 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          >
            {stories.length > 0 &&
              stories.map((story) => (
                <SwiperSlide key={story._id}>
                  <div
                    className="story-player-wrapper"
                    style={{
                      backgroundImage: `url('${story.asset}')`,
                    }}
                  ></div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default StoryPlayer;
