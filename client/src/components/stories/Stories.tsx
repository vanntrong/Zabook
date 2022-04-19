import { Avatar } from '@mui/material';
import React from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';

import './stories.scss';
import Story from './story/Story';

const Stories = () => {
  return (
    <div className="stories">
      <div className="create-story">
        <div className="create-story__avatar">
          <img
            src="https://images.unsplash.com/photo-1644982654072-0b42e6636821?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
        <div className="create-story-title">
          <Avatar className="create-story-icon">+</Avatar>
          <span>Create story</span>
        </div>
      </div>
      <Story />
      <Story />
      <Story />
      <Story />
      <Link to="/stories">
        <Avatar className="story-seemore">
          <ArrowRightAltIcon />
        </Avatar>
      </Link>
    </div>
  );
};

export default Stories;
