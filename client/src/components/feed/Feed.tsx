import { getStoriesApi } from 'api/storyApi';
import CreatePost from 'components/post/createPost/CreatePost';
import Stories from 'components/stories/Stories';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectPosts } from 'store/slice/postSlice';
import { selectStories, storiesAction } from 'store/slice/storiesSlice';
import Post from './../post/Post';
import './feed.scss';

// import SkeletonLoading from '../SkeletonLoading';

const Feed = () => {
  const currentPostsUser = useAppSelector(selectPosts);
  // const [stories, setStories] = useState<storyType[]>([]);
  const stories = useAppSelector(selectStories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getStories = async () => {
      const res = await getStoriesApi({ page: 0 });
      // setStories(res);
      dispatch(storiesAction.setStories(res));
    };
    getStories();
  }, [dispatch]);
  return (
    <div className="feed">
      <Stories stories={stories} />
      <CreatePost />
      <div className="post-list">
        {currentPostsUser?.length > 0 &&
          currentPostsUser.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Feed;
