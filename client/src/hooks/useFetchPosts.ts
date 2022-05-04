import { getPostsApi } from 'api/postApi';
import { useEffect, useState } from 'react';
import { PostType, UserType } from 'shared/types';

const useFetchPosts = (page: number, user: UserType | null) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(true);
  useEffect(() => {
    const getPostsOfUser = async (id: string) => {
      const posts = await getPostsApi(id, { page });

      if (posts.length === 0) {
        setHasMore(false);
        setIsFetchingPosts(false);
        return;
      }
      setPosts((prev) => [...prev, ...posts]);
    };

    if (user) {
      getPostsOfUser(user._id);
    }
    const timer = setTimeout(() => {
      setIsFetchingPosts(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user, page]);

  return {
    posts,
    setPosts,
    hasMore,
    setHasMore,
    isFetchingPosts,
  };
};

export default useFetchPosts;
