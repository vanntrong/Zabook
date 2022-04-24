import { Avatar } from '@mui/material';
import Feed from 'components/feed/Feed';
import withLayout from 'components/layout/Layout';
import React, { useEffect } from 'react';
import './home.scss';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Zabook';
  }, []);
  return (
    <>
      <div className="homePage">
        <div className="mainWrapper">
          <div className="home-main">
            <div className="home-main-left">
              <Feed />
            </div>
            <div className="home-main-right">
              <div className="home-main-right-list">
                <div className="home-main-right-title">
                  <h3>Friend Request</h3>
                  <span>See all</span>
                </div>
                <hr />
                <div className="home-main-right-content">
                  <div className="friend-request">
                    <div className="friend-request-info">
                      <Avatar
                        className="friend-request-avatar"
                        src="http://uitheme.net/sociala/images/user-7.png"
                        alt=""
                      />
                      <div className="friend-request-name">
                        <h4>John Doe</h4>
                        <span>12 mutual friends</span>
                      </div>
                    </div>
                    <div className="friend-request-action">
                      <button className="friend-request-button friend-request-button-confirm">
                        Confirm
                      </button>
                      <button className="friend-request-button friend-request-button-delete">
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="friend-request">
                    <div className="friend-request-info">
                      <Avatar
                        className="friend-request-avatar"
                        src="http://uitheme.net/sociala/images/user-7.png"
                        alt=""
                      />
                      <div className="friend-request-name">
                        <h4>John Doe</h4>
                        <span>12 mutual friends</span>
                      </div>
                    </div>
                    <div className="friend-request-action">
                      <button className="friend-request-button friend-request-button-confirm">
                        Confirm
                      </button>
                      <button className="friend-request-button friend-request-button-delete">
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="friend-request">
                    <div className="friend-request-info">
                      <Avatar
                        className="friend-request-avatar"
                        src="http://uitheme.net/sociala/images/user-7.png"
                        alt=""
                      />
                      <div className="friend-request-name">
                        <h4>John Doe</h4>
                        <span>12 mutual friends</span>
                      </div>
                    </div>
                    <div className="friend-request-action">
                      <button className="friend-request-button friend-request-button-confirm">
                        Confirm
                      </button>
                      <button className="friend-request-button friend-request-button-delete">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withLayout(HomePage);
