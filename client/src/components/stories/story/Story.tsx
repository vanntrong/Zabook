import { Avatar } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { storyType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import './story.scss';

interface StoryProps {
  story: storyType;
}

const Story: FC<StoryProps> = ({ story }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <>
      <Link to={`/stories/${story.userPost._id}`}>
        <div className="story">
          <div className="story-wrapper" style={{ backgroundImage: `url('${story.asset}')` }}>
            <Avatar
              className={`story-user-avatar ${
                story.views.includes(currentUser!._id) ? 'seen' : 'not-seen'
              }`}
              src={story.userPost.avatar}
              alt=""
            />
            <p className="story-user-name">{story.userPost.fullName}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Story;
