import React from 'react';
import Comment from './comment/Comment';

import './comments.scss';

export const Comments = () => {
  return (
    <div className="comments">
      <Comment />
      <Comment />
    </div>
  );
};
