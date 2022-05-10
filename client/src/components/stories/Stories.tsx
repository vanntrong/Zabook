import React, { FC } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { storyType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import './stories.scss';
import Story from './story/Story';

interface StoriesProps {
  stories: storyType[];
}

const Stories: FC<StoriesProps> = ({ stories }) => {
  const isDarkMode = useAppSelector(selectTheme);
  return (
    <div className={`stories ${isDarkMode ? 'dark' : ''}`}>
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
