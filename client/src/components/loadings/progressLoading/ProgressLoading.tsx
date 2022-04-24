import React from 'react';

import './progressLoading.scss';

const ProgressLoading = () => {
  return (
    <div className="progressLoading">
      <div className="progressLoading-circle"></div>
      <p className="progressLoading-content">Please wait...</p>
    </div>
  );
};

export default ProgressLoading;
