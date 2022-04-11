import React from 'react';

import './navbarBottom.scss';

const NavbarBottom = () => {
  return (
    <div className="navbarBottom">
      <div className="navbarBottom-user">
        <div className="navbarBottom-user-avatar">
          <img
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
        <div className="navbarBottom-user-name">
          <p>Jacky Henry</p>
          <span>It's you</span>
        </div>
      </div>
    </div>
  );
};

export default NavbarBottom;
