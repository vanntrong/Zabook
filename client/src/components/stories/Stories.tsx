import React, { FC } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { storyType } from 'shared/types';
import './stories.scss';
import Story from './story/Story';

interface StoriesProps {
  stories: storyType[];
}

const Stories: FC<StoriesProps> = ({ stories }) => {
  return (
    <div className="stories">
      <Link className="create-story" to="/stories/create">
        <div className="create-story-wrapper">
          <div className="create-story__button">
            <AiOutlinePlus />
          </div>
          <p className="create-story-title">Add Story</p>
        </div>
      </Link>
      {stories &&
        stories.length > 0 &&
        stories.map((story) => <Story key={story._id} story={story} />)}
    </div>
  );
};

export default Stories;
