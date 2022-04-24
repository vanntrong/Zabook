import React from 'react';

import './simpleLoading.scss';

const SimpleLoading = () => {
  return (
    <div className="simple-loading">
      <div className="loading-container">
        <div className="loading-text-wrapper">
          <div className="loading-text text-z">z</div>
          <div className="loading-text text-a">a</div>
          <div className="loading-text text-b">b</div>
          <div className="loading-text text-o">o</div>
          <div className="loading-text text-o-2">o</div>
          <div className="loading-text text-k">k</div>
        </div>
      </div>
    </div>
  );
};

export default SimpleLoading;
