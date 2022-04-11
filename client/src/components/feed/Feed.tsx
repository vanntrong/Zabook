import React from 'react';

import './feed.scss';
import Post from './../post/Post';

const Feed = () => {
  return (
    <div className="feed">
      <div className="post-wrapper">
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
