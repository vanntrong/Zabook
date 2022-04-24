import { Avatar } from '@mui/material';
import React from 'react';

import './story.scss';

const Story = () => {
  return (
    <div
      className="story"
      style={{ backgroundImage: `url('http://uitheme.net/sociala/images/s-1.jpg')` }}
    >
      <Avatar
        className="story-user-avatar"
        src="http://uitheme.net/sociala/images/user-11.png"
        alt=""
      />
      <p className="story-user-name">Victor Exrixon</p>
    </div>
  );
};

export default Story;
