import React from 'react';

import './feed.scss';
import Post from './../post/Post';
// import SkeletonLoading from '../SkeletonLoading';

const Feed = () => {
  return (
    <div className="feed">
      <div className="post-wrapper">
        {/* <SkeletonLoading type="post" /> */}
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Feed;
