import OnlineUser from 'components/onlineUser/OnlineUser';
import React, { FC } from 'react';

import './rightbar.scss';

interface RightbarProps {
  className?: string;
}

const RightBar: FC<RightbarProps> = ({ className }) => {
  return (
    <div className={'rightBar ' + className}>
      <div className="rightBar-wrapper">
        <h4 className="rightBar-title">Upcoming events</h4>
        <div className="event-list">
          <div className="event-item">
            <div className="event-img">
              <img
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </div>
            <div className="event-info">
              <h5>Google open meetup - Pixel</h5>
              <span>3:10 PM, Today</span>
            </div>
          </div>
        </div>
      </div>
      <div className="online-user-list">
        <OnlineUser />
        <OnlineUser />
        <OnlineUser />
        <OnlineUser />
        <OnlineUser />
        <OnlineUser />
        <OnlineUser />
      </div>
    </div>
  );
};

export default RightBar;
