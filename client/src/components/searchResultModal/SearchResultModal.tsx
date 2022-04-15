import ResultUser from 'components/resultuser/ResultUser';
import React, { FC } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './searchResultModal.scss';
import { Avatar } from '@mui/material';

interface SearchResultModalProps {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchResultModal: FC<SearchResultModalProps> = ({ handleClose }) => {
  return (
    <div className="search-result">
      <div className="search-result__top">
        <div onClick={() => handleClose(false)}>
          <Avatar className="go-back">
            <ArrowBackIcon fontSize="small" htmlColor="#666" />
          </Avatar>
        </div>
        <div className="search-result__input">
          <input type="text" placeholder="Search facebook" autoFocus />
        </div>
      </div>
      <div className="search-result__list"></div>
      <div className="search-history">
        <h3>Recent searches</h3>
        <div className="search-history__list">
          <ResultUser />
          <ResultUser />
          <ResultUser />
          <ResultUser />
          <ResultUser />
          <ResultUser />
          <ResultUser />
        </div>
      </div>
    </div>
  );
};

export default SearchResultModal;
