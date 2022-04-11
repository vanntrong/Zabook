import React, { FC } from 'react';

import './navbar.scss';
interface NavbarProps {
  className?: string;
}

const Navbar: FC<NavbarProps> = ({ className }) => {
  return (
    <div className={`navbar ${className}`}>
      <div className="navbar-list">
        <div className="navbar-item active">
          <span>Post</span>
        </div>
        <div className="navbar-item">
          <span>Photos</span>
        </div>
        <div className="navbar-item">
          <span>Video</span>
        </div>
        <div className="navbar-item">
          <span>Communities</span>
        </div>
        <div className="navbar-item">
          <span>Favorites</span>
        </div>
        <div className="navbar-item">
          <span>Recommendations</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
