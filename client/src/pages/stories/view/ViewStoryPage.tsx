import { Avatar } from '@mui/material';
import { getStoriesApi } from 'api/storyApi';
import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';
import StoryPlayer from 'components/player/storyPlayer/StoryPlayer';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useParams } from 'react-router-dom';
import { storyType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import Navbar from './../../../components/navbar/Navbar';
import './viewStoryPage.scss';

const ViewStoryPage = () => {
  const params = useParams();
  // const stories = useAppSelector(selectStories);
  const [stories, setStories] = useState<storyType[]>([]);
  const [isFetchingStory, setIsFetchingStory] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const getStories = async () => {
      setIsFetchingStory(true);
      const res = await getStoriesApi({ page });
      if (res.length === 0) {
        setHasMore(false);
        setIsFetchingStory(false);
        return;
      }
      setStories((prev) => [...prev, ...res]);
      setIsFetchingStory(false);
    };
    getStories();
  }, [page]);
  return (
    <>
      <Navbar />
      <div className="viewStoryPage">
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
                {isFetchingStory && <SkeletonLoading type="info" />}
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
          {!isFetchingStory && params.storyId && <StoryPlayer userPost={params!.storyId} />}
        </div>
      </div>
    </>
  );
};

export default ViewStoryPage;
