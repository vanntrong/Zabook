import { getHistoryInfoApi, searchUserApi } from 'api/userApi';
import ResultUser from 'components/modal/searchResultModal/resultuser/ResultUser';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import './searchResultModal.scss';

export interface searchResult {
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

interface userHistoryInfoType {
  avatar: string;
  fullName: string;
  id: string;
  username: string;
  _id: string;
}

const SearchResultModal: FC<SearchResultModalProps> = ({ handleClose, searchText }) => {
  const [historySearchResultInfo, setHistorySearchResultInfo] = useState<userHistoryInfoType[]>([]);
  const currentUser = useAppSelector(selectCurrentUser);
  const [searchResult, setSearchResult] = useState<searchResult[]>([]);
  const typingTimeout = useRef<any>(null);

  useEffect(() => {
    const getHistorySearchInfo = async () => {
      const res = await getHistoryInfoApi(currentUser!._id);
      setHistorySearchResultInfo(res);
    };
    getHistorySearchInfo();
  }, [currentUser]);

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

  return (
    <div className="search-result">
      <div className="search-result__top"></div>
      <div className="search-result__list"></div>
      <div className="search-history">
        {historySearchResultInfo.length > 0 && !searchResult.length && <h3>Recent searches</h3>}
        <div className="search-history__list">
          {historySearchResultInfo.length > 0 &&
            !searchResult.length &&
            historySearchResultInfo.map((user, index) => (
              <ResultUser key={index} user={user} type="history" />
            ))}
          {!historySearchResultInfo.length && !searchResult.length && (
            <p className="no-result">No recent searches</p>
          )}
          {searchResult.length > 0 &&
            searchResult.map(
              (user) =>
                user._id !== currentUser!._id && (
                  <ResultUser user={user} type="search" key={user._id} />
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultModal;
