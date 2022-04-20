import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import withLayout from 'components/layout/Layout';
import RightBar from 'components/rightbar/Rightbar';
import SkeletonLoading from 'components/SkeletonLoading';
import UserInfo from 'components/userinfo/UserInfo';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import './information.scss';

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
                {user.city}
              </div>
            )}
            {!isFetchingUserInfo && user?.work && (
              <div className="overview">
                <WorkIcon />
                {user.work}
              </div>
            )}
            {!isFetchingUserInfo && user?.relationship && (
              <div className="overview">
                <PersonIcon />
                {user.relationship}
              </div>
            )}
            {!isFetchingUserInfo && user?.school && (
              <div className="overview">
                <SchoolIcon />
                {user.school}
              </div>
            )}
          </div>
        </div>
        <RightBar className="information-rightbar" />
      </div>
    </>
  );
};

export default withLayout(InformationPage);
