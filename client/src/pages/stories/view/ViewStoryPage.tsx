import { Avatar } from '@mui/material';
import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';
import StoryPlayer from 'components/player/storyPlayer/StoryPlayer';
import useFetchStories from 'hooks/useFetchStories';
import moment from 'moment';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import Navbar from './../../../components/navbar/Navbar';
import './viewStoryPage.scss';
import { selectTheme } from '../../../store/slice/themeSlice';

const ViewStoryPage = () => {
  const params = useParams();
  const [page, setPage] = useState<number>(0);
  const currentUser = useAppSelector(selectCurrentUser);
  const isDarkMode = useAppSelector(selectTheme);
  const { stories, hasMore, isFetchingStories } = useFetchStories(page);

  return (
    <>
      <Navbar />
      <div className={`viewStoryPage ${isDarkMode ? 'dark' : ''}`}>
        <div className="viewStoryPage-sidebar">
          <div className="viewStoryPage-sidebar-top">
            <h1>Stories</h1>
            <div className="viewStoryPage-sidebar-create">
              <h3>Your Story</h3>
              <Link className="create-story" to="/stories/create">
                <div className="create-story-wrapper">
                  <div className="create-story__button">
                    <AiOutlinePlus />
                  </div>
                  <p className="create-story-title">Create a story</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="viewStoryPage-sidebar-bottom">
            <h2>All Stories</h2>
            <InfiniteScroll
              dataLength={stories.length}
              hasMore={hasMore}
              next={() => setPage((prev) => prev + 1)}
              loader={null}
            >
              <div className="viewStoryPage-slide-list">
                {isFetchingStories && <SkeletonLoading type="info" />}
                {stories.length > 0 &&
                  stories.map((story) => (
                    <Link key={story._id} to={`/stories/${story._id}`}>
                      <div
                        className={`viewStoryPage-slide-item ${
                          params.storyId === story._id ? 'active' : ''
                        }`}
                      >
                        <Avatar
                          className={`viewStoryPage-slide-item-avatar ${
                            story.views.includes(currentUser!._id) ? 'seen' : 'not-seen'
                          }`}
                          src={story.userPost.avatar}
                          alt={story.userPost.fullName}
                        />
                        <div className="viewStoryPage-slide-item-info">
                          <h3>{story.userPost.fullName}</h3>
                          <p>{moment(story.createdAt).fromNow()}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
        <div className="viewStoryPage-main">
          {!isFetchingStories && params.storyId && <StoryPlayer userPost={params!.storyId} />}
        </div>
      </div>
    </>
  );
};

export default ViewStoryPage;
