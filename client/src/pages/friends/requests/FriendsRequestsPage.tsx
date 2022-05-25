import { getAllFriendRequestApi } from 'api/friendRequestApi';
import FriendRequest from 'components/friendRequest/FriendRequest';
import withLayout from 'components/layout/Layout';
import React, { useEffect, useState } from 'react';
import { friendRequestType } from 'shared/types';
import InfiniteScroll from 'react-infinite-scroll-component';

import './friendRequestPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import { selectTheme } from 'store/slice/themeSlice';

const FriendsRequestsPage = () => {
  const [friendsRequest, setFriendsRequest] = useState<friendRequestType[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const currentUser = useAppSelector(selectCurrentUser);
  const isDarkMode = useAppSelector(selectTheme);
  const [isFetchingFriendRequest, setIsFetchingFriendRequest] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.username !== params.username) {
      navigate('/404');
    }
  }, [currentUser?.username, params.username, navigate]);

  useEffect(() => {
    const getFriendsRequest = async () => {
      setIsFetchingFriendRequest(true);
      const res = await getAllFriendRequestApi({ page });
      if (res.length === 0) {
        setHasMore(false);
        setIsFetchingFriendRequest(false);
      }
      setFriendsRequest((prev) => [...prev, ...res]);
      setIsFetchingFriendRequest(false);
    };
    getFriendsRequest();
  }, [page]);
  return (
    <div className={`friendsRequestsPage ${isDarkMode ? 'dark' : ''}`}>
      <div className="mainWrapper">
        <div className="friendsRequestsPage-wrapper">
          <div className="friendsRequestsPage-header">
            <h2>Friend Request</h2>
          </div>
          <InfiniteScroll
            dataLength={friendsRequest.length}
            hasMore={hasMore}
            next={() => setPage((prev) => prev + 1)}
            loader={null}
            style={{ overflow: 'hidden' }}
          >
            <div className="friendsRequestsPage-list">
              {!isFetchingFriendRequest &&
                friendsRequest.length > 0 &&
                friendsRequest.map((friendRequest) => (
                  <FriendRequest
                    key={friendRequest._id}
                    friendRequest={friendRequest}
                    setFriendsRequest={setFriendsRequest}
                  />
                ))}
            </div>
            {!isFetchingFriendRequest && friendsRequest.length === 0 && (
              <p style={{ marginTop: '10px', textAlign: 'center' }}>No friends request</p>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default withLayout(FriendsRequestsPage);
