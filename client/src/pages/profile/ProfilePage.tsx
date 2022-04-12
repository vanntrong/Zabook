import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';
import React from 'react';

import './profilepage.scss';
import UserInfo from 'components/userinfo/UserInfo';
import InputPost from 'components/input/InputPost/InputPost';
import Post from 'components/post/Post';

const ProfilePage = () => {
  return (
    <div className="profile">
      <Sidebar />
      <Navbar />
      <div className="profile-wrapper">
        <UserInfo />
        <div className="post-wrapper">
          <div className="post-item">
            <InputPost className="post-item__input" />
            <div className="post-info">
              <div className="info-item">
                <h5>739k</h5>
                <span>Likes</span>
              </div>
              <div className="info-item">
                <h5>254k</h5>
                <span>Follower</span>
              </div>
              <div className="info-item">
                <h5>193</h5>
                <span>Friends</span>
              </div>
              <div className="info-item">
                <h5>203</h5>
                <span>Posts</span>
              </div>
            </div>
          </div>
          <div className="post-list">
            <h3 className="post-list__title">Publications</h3>
            <div className="post-list__wrapper">
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
