import Stories from 'components/stories/Stories';
import React from 'react';
import { useAppSelector } from 'store/hooks';
import { selectPosts } from 'store/slice/postSlice';
import { selectCurrentUser } from 'store/slice/userSlice';
import Post from './../post/Post';
import './feed.scss';

// import SkeletonLoading from '../SkeletonLoading';

const Feed = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const currentPostsUser = useAppSelector(selectPosts);
  return (
    <div className="feed">
      <div className="post-wrapper">
        {/* <SkeletonLoading type="post" /> */}
        <Stories />
        {currentPostsUser.map((post) => (
          <Post key={post._id} post={post} user={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
