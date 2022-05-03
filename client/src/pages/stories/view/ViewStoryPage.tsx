import { Avatar } from '@mui/material';
import StoryPlayer from 'components/player/storyPlayer/StoryPlayer';
import moment from 'moment';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectStories } from 'store/slice/storiesSlice';
import { selectCurrentUser } from 'store/slice/userSlice';
import Navbar from './../../../components/navbar/Navbar';
import './viewStoryPage.scss';

const ViewStoryPage = () => {
  const params = useParams();
  const stories = useAppSelector(selectStories);
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <>
      <Navbar />
      <div className="viewStoryPage">
        <div className="viewStoryPage-sidebar">
          <div className="viewStoryPage-sidebar-top">
            <h1>Stories</h1>
            <div className="viewStoryPage-sidebar-create">
              <h3>Your Story</h3>
              <Link className="create-story" to="/stories/create">
                <div className="create-story-wrapper">
                  <div className="create-story__button">
                    <AiOutlinePlus />
                  </div>
                  <p className="create-story-title">Create a story</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="viewStoryPage-sidebar-bottom">
            <h2>All Stories</h2>
            <div className="viewStoryPage-slide-list">
              {stories.length > 0 &&
                stories.map((story) => (
                  <Link key={story._id} to={`/stories/${story._id}`}>
                    <div
                      className={`viewStoryPage-slide-item ${
                        params.storyId === story._id ? 'active' : ''
                      }`}
                    >
                      <Avatar
                        className={`viewStoryPage-slide-item-avatar ${
                          story.views.includes(currentUser!._id) ? 'seen' : 'not-seen'
                        }`}
                        src={story.userPost.avatar}
                        alt={story.userPost.fullName}
                      />
                      <div className="viewStoryPage-slide-item-info">
                        <h3>{story.userPost.fullName}</h3>
                        <p>{moment(story.createdAt).fromNow()}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <div className="viewStoryPage-main">
          {params.storyId && <StoryPlayer userPost={params!.storyId} />}
        </div>
      </div>
    </>
  );
};

export default ViewStoryPage;
