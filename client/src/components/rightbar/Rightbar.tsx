import React from 'react';
import AddIcon from '@mui/icons-material/Add';

import './rightbar.scss';

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="rightBar-wrapper">
        <h4 className="rightBar-title">Stories</h4>
        <div className="story-list">
          <div className="stories your-stories">
            <AddIcon htmlColor="#ffffff" />
          </div>
          <div className="stories">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="stories">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="stories">
            <img
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default RightBar;
