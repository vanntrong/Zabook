import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';
import UserInfo from 'components/userinfo/UserInfo';
import React from 'react';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';

import './information.scss';

const InformationPage = () => {
  return (
    <div className="information">
      <Sidebar />
      <Navbar />
      <div className="information-wrapper">
        <UserInfo />
        <div className="overviews">
          <div className="overview">
            <CakeIcon />
            47 years
          </div>
          <div className="overview">
            <LocationOnIcon />
            New York
          </div>
          <div className="overview">
            <WorkIcon />
            CEO
          </div>
          <div className="overview">
            <PersonIcon />
            Relationships
          </div>
          <div className="overview">
            <SchoolIcon />
            School
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPage;
