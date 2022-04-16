import ResultUser from 'components/searchResultModal/resultuser/ResultUser';
import React, { FC, useRef, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './searchResultModal.scss';
import { Avatar } from '@mui/material';
import { useAppSelector } from 'store/hooks';
import { selectHistorySearch } from 'store/slice/userSlice';
import { searchUserApi } from 'api/userApi';

interface searchResult {
  avatar: string;
  fullName: string;
  id: string;
  username: string;
  _id: string;
}
interface SearchResultModalProps {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchResultModal: FC<SearchResultModalProps> = ({ handleClose }) => {
  const historySearch = useAppSelector(selectHistorySearch);
  const [searchText, setSearchText] = useState<string>('');
  const [searchResult, setSearchResult] = useState<searchResult[]>([]);
  const typingTimeout = useRef<any>(null);

  const handleChangeSearchText = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(async () => {
      if (value.trim().length === 0) {
        setSearchResult([]);
      } else {
        const params = {
          q: value,
        };
        const res = await searchUserApi(params);
        setSearchResult(res);
      }
    }, 300);
  };

  return (
    <div className="search-result">
      <div className="search-result__top">
        <div onClick={() => handleClose(false)}>
          <Avatar className="go-back">
            <ArrowBackIcon fontSize="small" htmlColor="#666" />
          </Avatar>
        </div>
        <div className="search-result__input">
          <input
            type="text"
            placeholder="Search facebook"
            autoFocus
            defaultValue={searchText}
            onChange={handleChangeSearchText}
          />
        </div>
      </div>
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
