import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';
import CreatePost from 'components/post/createPost/CreatePost';
import Stories from 'components/stories/Stories';
import React from 'react';
import { useAppSelector } from 'store/hooks';
import { selectPosts, selectPostsPending } from 'store/slice/postSlice';
import { selectStories } from 'store/slice/storiesSlice';
import Post from './../post/Post';
import './feed.scss';

// import SkeletonLoading from '../SkeletonLoading';

const Feed = () => {
  const currentPostsUser = useAppSelector(selectPosts);
  const stories = useAppSelector(selectStories);
  const isFetching = useAppSelector(selectPostsPending);

  return (
    <div className="feed">
      <Stories stories={stories} />
      <CreatePost />
      <div className="post-list">
        {isFetching && <SkeletonLoading type="post" />}
        {currentPostsUser?.length > 0 &&
          currentPostsUser.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Feed;
