import Navbar from 'components/navbar/Navbar';
import RightBar from 'components/rightbar/Rightbar';
import Sidebar from 'components/sidebar/Sidebar';
import React, { Component, FC } from 'react';

const withLayout = <P extends object>(Element: FC<P>) => {
  return class extends Component<P> {
    render() {
      return (
        <>
          <Navbar />
          <Sidebar />
          <RightBar />
          <Element {...this.props} />
        </>
      );
    }
  };
};

export default withLayout;
