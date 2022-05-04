import { Avatar } from '@mui/material';
import { getStoriesApi } from 'api/storyApi';
import withLayout from 'components/layout/Layout';
import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { storyType } from 'shared/types';
import InfiniteScroll from 'react-infinite-scroll-component';

import './storiesPage.scss';

const StoriesPage = () => {
  const [stories, setStories] = useState<storyType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingStories, setIsFetchingStories] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getStories = async () => {
      setIsFetchingStories(true);
      const res = await getStoriesApi({ page });
      if (res.length === 0) {
        setHasMore(false);
        setIsFetchingStories(false);
        return;
      }
      setStories((prev) => [...prev, ...res]);
      setIsFetchingStories(false);
    };
    getStories();
  }, [page]);
  return (
    <div className="storiesPage">
      <div className="mainWrapper">
        <div className="storiesPage-wrapper">
          <div className="storiesPage-header">
            <h2>Stories</h2>
          </div>
          <InfiniteScroll
            dataLength={stories.length}
            hasMore={hasMore}
            next={() => setPage((prev) => prev + 1)}
            loader={null}
          >
            <div className="storiesPage-list">
              {isFetchingStories && <SkeletonLoading type="story" />}
              {!isFetchingStories &&
                stories.length > 0 &&
                stories.map((story) => (
                  <Link to={`/stories/${story.userPost._id}`}>
                    <div className="storiesPage-item">
                      <div
                        className="storiesPage-item-wrapper"
                        style={{
                          backgroundImage: `url('${story.asset}')`,
                        }}
                      >
                        <Avatar
                          className={`storiesPage-item-user-avatar`}
                          src={story.userPost.avatar}
                          alt=""
                        />
                        <p className="storiesPage-item-user-name">{story.userPost.fullName}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default withLayout(StoriesPage);
