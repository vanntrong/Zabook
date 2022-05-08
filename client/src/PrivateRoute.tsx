import React, { FC } from 'react';

import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';

const PrivateRoute: FC = ({ children }) => {
  const user = useAppSelector(selectCurrentUser);
  return <>{user ? children : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
