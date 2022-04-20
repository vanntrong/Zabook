import Feed from 'components/feed/Feed';
import withLayout from 'components/layout/Layout';
import RightBar from 'components/rightbar/Rightbar';
import React, { useEffect } from 'react';
import './home.scss';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Zabook';
  }, []);
  return (
    <>
      <div className="home">
        <div className="home-section">
          <div className="home-feed">
            <Feed />
          </div>
        </div>
        <RightBar className="home-rightbar" />
      </div>
    </>
  );
};

export default withLayout(HomePage);
