import { Avatar } from '@mui/material';
import React from 'react';

import './comment.scss';

const Comment = () => {
  return (
    <div className="comment">
      <Avatar src="https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
      <p className="comment-content">Nam liber tempor cum soluta nobis eleifend option</p>
    </div>
  );
};

export default Comment;
