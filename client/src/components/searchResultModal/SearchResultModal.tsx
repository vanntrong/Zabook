import { searchUserApi } from 'api/userApi';
import ResultUser from 'components/searchResultModal/resultuser/ResultUser';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectHistorySearch } from 'store/slice/userSlice';
import './searchResultModal.scss';

interface searchResult {
  avatar: string;
  fullName: string;
  id: string;
  username: string;
  _id: string;
}
interface SearchResultModalProps {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  searchText: string;
}

const SearchResultModal: FC<SearchResultModalProps> = ({ handleClose, searchText }) => {
  const historySearch = useAppSelector(selectHistorySearch);
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
        };
        const res = await searchUserApi(params);
        setSearchResult(res);
      }
    }, 300);
  }, [searchText]);

  return (
    <div className="search-result">
      <div className="search-result__top"></div>
      <div className="search-result__list"></div>
      <div className="search-history">
        {historySearch.length > 0 && !searchResult.length && <h3>Recent searches</h3>}
        <div className="search-history__list">
          {historySearch.length > 0 &&
            !searchResult.length &&
            historySearch.map((user, index) => (
              <ResultUser key={index} user={user} type="history" />
            ))}
          {!historySearch.length && !searchResult.length && (
            <p className="no-result">No recent searches</p>
          )}
          {searchResult.length > 0 &&
            searchResult.map((user) => <ResultUser user={user} type="search" key={user._id} />)}
        </div>
      </div>
    </div>
  );
};

export default SearchResultModal;
