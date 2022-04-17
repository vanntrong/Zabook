import Feed from 'components/feed/Feed';
import InputPost from 'components/input/InputPost/InputPost';
import Navbar from 'components/navbar/Navbar';
import RightBar from 'components/rightbar/Rightbar';
import React, { useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';

import './home.scss';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Zabook';
  }, []);
  return (
    <>
      <Sidebar className="sidebarHome" />
      <Navbar className="navbarHome" />
      <div className="home">
        <div className="home-feature">
          <div className="home-section">
            <div className="home-feed">
              <InputPost />
              <Feed />
            </div>
            <div className="home-right">
              <RightBar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
