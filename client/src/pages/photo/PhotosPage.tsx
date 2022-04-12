import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';
// import SkeletonLoading from 'components/SkeletonLoading';
import UserInfo from 'components/userinfo/UserInfo';
import React from 'react';

import './photopage.scss';

const PhotosPage = () => {
  return (
    <div className="photos">
      <Sidebar />
      <Navbar />
      <div className="photos-wrapper">
        <UserInfo />
        <div className="photo-list">
          {/* <SkeletonLoading type="photo" /> */}
          <div className="photo-item">
            <img
              src="https://images.unsplash.com/photo-1587502537104-aac10f5fb6f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="photo-item">
            <img
              src="https://images.unsplash.com/photo-1587502537104-aac10f5fb6f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="photo-item">
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="photo-item">
            <img
              src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="photo-item">
            <img
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="photo-item">
            <img
              src="https://images.unsplash.com/photo-1587502537104-aac10f5fb6f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="photo-item">
            <img
              src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG5hdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="photo-item">
            <img
              src="https://images.unsplash.com/photo-1587502537104-aac10f5fb6f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="photo-item">
            <img
              src="https://images.unsplash.com/photo-1587502537104-aac10f5fb6f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosPage;
