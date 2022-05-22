import React, { FC } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import './skeleton.scss';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';

interface SkeletonLoadingProps {
  type: 'post' | 'photo' | 'friend' | 'info' | 'story';
}

const SkeletonLoading: FC<SkeletonLoadingProps> = ({ type }) => {
  const isDarkMode = useAppSelector(selectTheme);
  switch (type) {
    case 'post':
      return (
        <div
          style={{
            backgroundColor: !isDarkMode ? 'white' : '#293145',
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
        <div
          className="info-loading"
          style={{
            backgroundColor: !isDarkMode ? 'white' : '#293145',
          }}
        >
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
    case 'story':
      return (
        <div className={`story-loading ${isDarkMode ? 'dark' : ''}`}>
          <Stack spacing={15}>
            <div className="story-loading-wrapper">
              <Skeleton variant="circular" width={80} height={70} />
              <div style={{ width: '100%' }}>
                <Skeleton variant="text" width="50%" height={20} />
                <Skeleton variant="text" width="30%" height={20} />
              </div>
            </div>
            {/* <div className="story-loading-action">
              <Skeleton variant="text" width={80} height={20} />
              <Skeleton variant="text" width={80} height={20} />
              <Skeleton variant="text" width={80} height={20} />
            </div> */}
          </Stack>
        </div>
      );
    default:
      return null;
  }
};

export default SkeletonLoading;
