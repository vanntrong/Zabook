import React from 'react';

import './simpleLoading.scss';

const SimpleLoading = () => {
  return (
    <div className="simple-loading">
      <div className="loading-container">
        <div className="loading-text-wrapper">
          <div className="loading-text text-s">s</div>
          <div className="loading-text text-o">o</div>
          <div className="loading-text text-c">c</div>
          <div className="loading-text text-i">i</div>
          <div className="loading-text text-a">a</div>
          <div className="loading-text text-l">l</div>
          <div className="loading-text text-a-2">a</div>
        </div>
      </div>
    </div>
  );
};

export default SimpleLoading;
