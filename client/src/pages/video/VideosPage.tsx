import { getProfileOtherApi } from 'api/userApi';
import UserInfo from 'components/userinfo/UserInfo';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';

import './videosPage.scss';

const VideosPage = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [user, setUser] = useState<null | UserType>(null);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getFriendProfile = async (username: string) => {
      try {
        const data: UserType = await getProfileOtherApi(username);
        setUser(data);
      } catch (error) {
        navigate('/404');
      }
    };
    // if currentUser different from params.username then we are in friend profile then get friend profile
    // else get current user profile from store
    if (params.username !== currentUser?.username) {
      getFriendProfile(params.username as string);
    } else {
      setUser(currentUser);
    }
  }, [params.username, currentUser, navigate]);

  useEffect(() => {
    document.title = `${user?.firstName} ${user?.lastName} | Zabook`;
  }, [user?.firstName, user?.lastName]);
  return (
    <div className="videos">
      <div className="mainWrapper">
        <div className="videosWrapper">
          <UserInfo user={user} />
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
