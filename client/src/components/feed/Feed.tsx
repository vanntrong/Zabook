import CreatePost from 'components/post/createPost/CreatePost';
import Stories from 'components/stories/Stories';
import React from 'react';
import { useAppSelector } from 'store/hooks';
import { selectPosts } from 'store/slice/postSlice';
import Post from './../post/Post';
import './feed.scss';

// import SkeletonLoading from '../SkeletonLoading';

const Feed = () => {
  const currentPostsUser = useAppSelector(selectPosts);
  return (
    <div className="feed">
      <Stories />
      <CreatePost />
      <div className="post-list">
        {currentPostsUser?.length > 0 &&
          currentPostsUser.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Feed;
