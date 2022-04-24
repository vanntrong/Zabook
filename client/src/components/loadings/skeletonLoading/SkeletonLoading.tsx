import React, { FC } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import './skeleton.scss';

interface SkeletonLoadingProps {
  type: 'post' | 'photo' | 'friend' | 'info';
}

const SkeletonLoading: FC<SkeletonLoadingProps> = ({ type }) => {
  switch (type) {
    case 'post':
      return (
        <div
          style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '8px',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          }}
        >
          <Stack spacing={15}>
            <div className="post-loading">
              <Skeleton variant="circular" width={60} height={60} />
              <div>
                <Skeleton variant="text" width={60} height={20} />
                <Skeleton variant="text" width={40} height={20} />
              </div>
            </div>
            <div className="post-loading-action">
              <Skeleton variant="text" width={80} height={20} />
              <Skeleton variant="text" width={80} height={20} />
              <Skeleton variant="text" width={80} height={20} />
            </div>
          </Stack>
        </div>
      );
    case 'photo':
      return (
        <div className="photo-loading">
          <Skeleton variant="rectangular" width={360} height={250} />
        </div>
      );
    case 'info':
      return (
        <div className="info-loading">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={80} height={20} />
        </div>
      );
    case 'friend':
      return (
        <div className="friend-loading">
          <div>
            <Skeleton variant="rectangular" width={133} height={133} />
          </div>
          <div>
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton variant="text" width={60} height={20} />
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default SkeletonLoading;
