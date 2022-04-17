import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';
import UserInfo from 'components/userinfo/UserInfo';
import React, { useEffect, useState } from 'react';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import moment from 'moment';

import './information.scss';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import { UserType } from 'shared/types';
import SkeletonLoading from 'components/SkeletonLoading';

const InformationPage = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isFetchingUserInfo, setIsFetchingUserInfo] = useState<boolean>(true);
  const currentUser = useAppSelector(selectCurrentUser);
  const params = useParams();

  useEffect(() => {
    if (params.username !== currentUser?.username) {
      setUser(null);
    } else {
      setUser(currentUser);
      setIsFetchingUserInfo(false);
    }
  }, [params.username, currentUser]);
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="information">
        <div className="information-wrapper">
          {user && <UserInfo user={user} />}
          <div className="overviews">
            {isFetchingUserInfo && <SkeletonLoading type="info" />}
            {!isFetchingUserInfo && user?.dateOfBirth && (
              <div className="overview">
                <CakeIcon />
                {moment(user.dateOfBirth).format('DD/MM/YYYY')}
              </div>
            )}
            {!isFetchingUserInfo && user?.city && (
              <div className="overview">
                <LocationOnIcon />
                New York
              </div>
            )}
            {!isFetchingUserInfo && user?.work && (
              <div className="overview">
                <WorkIcon />
                CEO
              </div>
            )}
            {!isFetchingUserInfo && user?.relationship && (
              <div className="overview">
                <PersonIcon />
                Relationships
              </div>
            )}
            {!isFetchingUserInfo && user?.school && (
              <div className="overview">
                <SchoolIcon />
                School
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationPage;
