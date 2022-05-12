import React, { FC } from 'react';

import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';

interface Props {
  isFetchingUser: boolean;
}

const PrivateRoute: FC<Props> = ({ children, isFetchingUser }) => {
  const user = useAppSelector(selectCurrentUser);
  return (
    <>
      {!isFetchingUser && !user && <Navigate to="/login" />}
      {!isFetchingUser && user && children}
    </>
  );
};

export default PrivateRoute;
