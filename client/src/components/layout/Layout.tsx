import Navbar from 'components/navbar/Navbar';
import RightBar from 'components/rightbar/Rightbar';
import Sidebar from 'components/sidebar/Sidebar';
import React, { FC } from 'react';

const withLayout = (Element: FC) => {
  return () => (
    <>
      <Navbar />
      <Sidebar />
      <RightBar />
      <Element />
    </>
  );
};

export default withLayout;
