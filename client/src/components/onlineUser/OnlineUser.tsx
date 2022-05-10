import { Avatar, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { onlineUserType } from 'components/rightbar/Rightbar';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import './onlineUser.scss';

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
  user: onlineUserType;
}

const OnlineUser: FC<Props> = ({ user }) => {
  const isDarkMode = useAppSelector(selectTheme);
  return (
    <Link to={`/${user.username}`}>
      <div className={`online-user ${isDarkMode ? 'dark' : ''}`}>
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
