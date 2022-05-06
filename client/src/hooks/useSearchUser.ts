import { searchUserApi } from 'api/userApi';
import { searchResult } from 'components/modal/searchResultModal/SearchResultModal';
import { useEffect, useRef, useState } from 'react';

const useSearchUser = (searchText: string) => {
  const [searchResult, setSearchResult] = useState<searchResult[]>([]);
  const typingTimeout = useRef<any>(null);
  useEffect(() => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(async () => {
      if (searchText.trim().length === 0) {
        setSearchResult([]);
      } else {
        const params = {
          q: searchText,
          limit: 10,
        };
        const res = await searchUserApi(params);
        setSearchResult(res);
      }
    }, 300);
  }, [searchText]);

  return {
    searchResult,
    setSearchResult,
  };
};

export default useSearchUser;
