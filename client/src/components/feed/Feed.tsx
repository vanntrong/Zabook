import { getFriendsPostsApi } from 'api/postApi';
import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';
import CreatePost from 'components/post/createPost/CreatePost';
import Stories from 'components/stories/Stories';
import useFetchStories from 'hooks/useFetchStories';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PostType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import Post from './../post/Post';
import './feed.scss';

// import SkeletonLoading from '../SkeletonLoading';

const Feed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);
  const currentUser = useAppSelector(selectCurrentUser);
  const { stories } = useFetchStories(0);

  useEffect(() => {
    const getFriendsPosts = async () => {
      setIsFetching(true);
      const res = await getFriendsPostsApi(currentUser!._id, { page });
      if (res.length === 0) {
        setHasMore(false);
      }
      setPosts((prev) => prev.concat(res));
      setIsFetching(false);
    };
    getFriendsPosts();
  }, [currentUser, page]);

  return (
    <div className="feed">
      <Stories stories={stories} />
      <CreatePost setPosts={setPosts} />
      <InfiniteScroll
        dataLength={posts.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={
          <div style={{ marginTop: '10px' }}>
            <SkeletonLoading type="post" />{' '}
          </div>
        }
        style={{ overflow: 'hidden' }}
      >
        <div className="post-list">
          {posts?.length > 0 &&
            posts.map((post) => <Post key={post._id} post={post} setPosts={setPosts} />)}
          {isFetching && <SkeletonLoading type="post" />}
          {!hasMore && (
            <p style={{ textAlign: 'center', marginTop: '10px' }}>Yay! You have seen it all</p>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default React.memo(Feed);
