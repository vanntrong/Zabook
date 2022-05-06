import React from 'react';

import './progressLoading.scss';

const ProgressLoading = () => {
  return (
    // <div className="progressLoading">
    //   <div className="progressLoading-circle"></div>
    //   <p className="progressLoading-content">Please wait...</p>
    // </div>
    <>
      <div className="loading">
        <div className="wrapper">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <span>Loading</span>
        </div>
      </div>
    </>
  );
};

export default ProgressLoading;
