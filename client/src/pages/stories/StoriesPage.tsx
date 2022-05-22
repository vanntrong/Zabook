import { Avatar } from '@mui/material';
import withLayout from 'components/layout/Layout';
import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';
import useFetchStories from 'hooks/useFetchStories';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import './storiesPage.scss';

const StoriesPage = () => {
  const [page, setPage] = useState(0);
  const isDarkMode = useAppSelector(selectTheme);
  const { stories, hasMore, isFetchingStories } = useFetchStories(page);

  return (
    <div className={`storiesPage ${isDarkMode ? 'dark' : ''}`}>
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
