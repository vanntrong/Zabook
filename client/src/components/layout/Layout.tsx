import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';
import React, { FC } from 'react';

const withLayout = (Element: FC) => {
  return () => (
    <>
      <Navbar />
      <Sidebar />
      <Element />
    </>
  );
};

export default withLayout;
