import { getAllFriendRequestApi } from 'api/friendRequestApi';
import Feed from 'components/feed/Feed';
import FriendRequest from 'components/friendRequest/FriendRequest';
import withLayout from 'components/layout/Layout';
import React, { useEffect, useState } from 'react';
import { friendRequestType } from 'shared/types';
import './home.scss';

const HomePage = () => {
  const [friendsRequest, setFriendsRequest] = useState<friendRequestType[]>([]);
  useEffect(() => {
    document.title = 'Sociala.';
  }, []);

  useEffect(() => {
    const getFriendsRequest = async () => {
      const res = await getAllFriendRequestApi({ page: 0 });
      setFriendsRequest(res);
    };
    getFriendsRequest();
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
                  {friendsRequest.length > 0 ? (
                    friendsRequest.map((friendRequest) => (
                      <FriendRequest
                        key={friendRequest._id}
                        friendRequest={friendRequest}
                        setFriendsRequest={setFriendsRequest}
                      />
                    ))
                  ) : (
                    <p>No Friend Request</p>
                  )}
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
