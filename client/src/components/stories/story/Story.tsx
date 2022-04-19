import React from 'react';

import './story.scss';

const Story = () => {
  return (
    <div className="story no-seen">
      <div className="story-user__avatar">
        <img
          src="https://images.unsplash.com/photo-1644982654072-0b42e6636821?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
      </div>
      <div className="story-user__name">
        <span>Minh Anh</span>
      </div>
    </div>
  );
};

export default Story;
