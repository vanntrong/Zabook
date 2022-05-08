import { getAllFriendRequestApi } from 'api/friendRequestApi';
import Feed from 'components/feed/Feed';
import FriendRequest from 'components/friendRequest/FriendRequest';
import withLayout from 'components/layout/Layout';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { friendRequestType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import { socket } from 'utils/socket';
import './home.scss';

const HomePage = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [friendsRequest, setFriendsRequest] = useState<friendRequestType[]>([]);
  useEffect(() => {
    document.title = 'Sociala.';
  }, []);

  useEffect(() => {
    const getFriendsRequest = async () => {
      const res = await getAllFriendRequestApi({ page: 0 });
      setFriendsRequest((prev) => [...prev, ...res]);
    };
    getFriendsRequest();
  }, []);

  useEffect(() => {
    socket.on('get-friend-request', (friendRequest) => {
      setFriendsRequest((prev) => [friendRequest, ...prev]);
    });
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
                  <Link to={`/${currentUser?.username}/friends/request`}>
                    <span>See all</span>
                  </Link>
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
