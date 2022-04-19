import Feed from 'components/feed/Feed';
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
      <div className="home">
        <Sidebar className="sidebarHome" />
        <RightBar />
        <div className="home-section">
          <Navbar className="navbarHome" />
          <div className="home-feed">
            <Feed />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
