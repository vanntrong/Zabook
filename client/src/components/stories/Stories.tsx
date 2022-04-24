import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import './stories.scss';
import Story from './story/Story';

const Stories = () => {
  return (
    <div className="stories">
      <div className="create-story">
        <div className="create-story__button">
          <AiOutlinePlus />
        </div>
        <p className="create-story-title">Add Story</p>
      </div>
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
    </div>
  );
};

export default Stories;
