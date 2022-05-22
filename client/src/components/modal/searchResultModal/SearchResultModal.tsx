import { getHistoryInfoApi } from 'api/userApi';
import ResultUser from 'components/modal/searchResultModal/resultuser/ResultUser';
import useSearchUser from 'hooks/useSearchUser';
import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
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
  const isDarkMode = useAppSelector(selectTheme);

  const { searchResult } = useSearchUser(searchText);

  useEffect(() => {
    const getHistorySearchInfo = async () => {
      const res = await getHistoryInfoApi(currentUser!._id);
      setHistorySearchResultInfo(res);
    };
    getHistorySearchInfo();
  }, [currentUser]);

  return (
    <div className={`search-result ${isDarkMode ? 'dark' : ''}`}>
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
