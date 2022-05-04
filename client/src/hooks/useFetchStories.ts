import { getStoriesApi } from 'api/storyApi';
import { useEffect, useState } from 'react';
import { storyType } from 'shared/types';

const useFetchStories = (page: number) => {
  const [stories, setStories] = useState<storyType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingStories, setIsFetchingStories] = useState(false);

  useEffect(() => {
    const getStories = async () => {
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

  return {
    stories,
    setStories,
    hasMore,
    setHasMore,
    isFetchingStories,
  };
};

export default useFetchStories;
