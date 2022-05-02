import { Avatar } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { storyType } from 'shared/types';
import './story.scss';

interface StoryProps {
  story: storyType;
}

const Story: FC<StoryProps> = ({ story }) => {
  return (
    <>
      <Link to={`/stories/${story.userPost._id}`}>
        <div className="story">
          <div className="story-wrapper" style={{ backgroundImage: `url('${story.asset}')` }}>
            <Avatar className="story-user-avatar" src={story.userPost.avatar} alt="" />
            <p className="story-user-name">{story.userPost.fullName}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Story;
