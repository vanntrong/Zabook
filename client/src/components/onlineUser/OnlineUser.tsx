import { Avatar, Badge } from '@mui/material';
import React, { FC } from 'react';
import { styled } from '@mui/material/styles';

import './onlineUser.scss';
import { UserType } from 'shared/types';
import { Link } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

interface Props {
  user: UserType;
}

const OnlineUser: FC<Props> = ({ user }) => {
  return (
    <Link to={`/${user.username}`}>
      <div className="online-user">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar src={user.avatar} className="online" />
        </StyledBadge>
        <span className="online-user-name">{user.fullName}</span>
      </div>
    </Link>
  );
};

export default OnlineUser;
