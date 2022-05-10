import { getAllFriendRequestApi } from 'api/friendRequestApi';
import { getSuggestUserApi } from 'api/userApi';
import Feed from 'components/feed/Feed';
import FriendRequest from 'components/friendRequest/FriendRequest';
import withLayout from 'components/layout/Layout';
import SuggestFriend from 'components/suggestFriend/SuggestFriend';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DifferentUserType, friendRequestType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import { selectCurrentUser } from 'store/slice/userSlice';
import { socket } from 'utils/socket';
import './home.scss';

const HomePage = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [friendsRequest, setFriendsRequest] = useState<friendRequestType[]>([]);
  const [suggestFriends, setSuggestFriends] = useState<DifferentUserType[]>([]);
  const isDarkMode = useAppSelector(selectTheme);
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
    const getFriendSuggest = async () => {
      const res = await getSuggestUserApi();
      setSuggestFriends(res);
    };
    getFriendSuggest();
  }, []);

  useEffect(() => {
    socket.on('get-friend-request', (friendRequest) => {
      setFriendsRequest((prev) => [friendRequest, ...prev]);
    });
  }, []);

  return (
    <>
      <div className={`homePage ${isDarkMode ? 'dark' : ''}`}>
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
              <div className="home-main-right-list">
                <div className="home-main-right-title">
                  <h3>Suggest Friends</h3>
                </div>
                <div className="home-main-right-content">
                  {suggestFriends.length > 0 &&
                    suggestFriends.map((user) => (
                      <SuggestFriend
                        user={user}
                        key={user._id}
                        setSuggestFriends={setSuggestFriends}
                      />
                    ))}
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
