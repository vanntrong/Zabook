import { getProfileApi } from 'api/userApi';
import AuthPage from 'pages/auth/AuthPage';
import FriendsPage from 'pages/friends/FriendsPage';
import HomePage from 'pages/home/HomePage';
import InformationPage from 'pages/information/InformationPage';
import PhotosPage from 'pages/photo/PhotosPage';
import ProfilePage from 'pages/profile/ProfilePage';
import SettingPage from 'pages/setting/SettingPage';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { postAction } from 'store/slice/postSlice';
import { selectCurrentUser, userAction } from 'store/slice/userSlice';
import './app.scss';

function App() {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [isFetchingUser, setIsFetchingUser] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token') || null;
    const getProfile = async () => {
      if (token) {
        const data = await getProfileApi();
        dispatch(userAction.setUser(data));
      }
    };
    getProfile();
    const timer = setTimeout(() => {
      setIsFetchingUser(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  useEffect(() => {
    const getPostsCurrentUser = async () => {
      if (user) {
        dispatch(postAction.getCurrentUserPostsRequest(user._id));
      }
    };
    getPostsCurrentUser();
  }, [dispatch, user]);
  return (
    <>
      {isFetchingUser && <div className="loading">Loading...</div>}
      {!isFetchingUser && (
        <Routes>
          <Route path="/" element={!user ? <Navigate to="/login" /> : <HomePage />} />
          <Route path="/:username" element={!user ? <Navigate to="/login" /> : <ProfilePage />} />
          <Route
            path="/:username/info"
            element={!user ? <Navigate to="/login" /> : <InformationPage />}
          />
          <Route
            path="/:username/friends"
            element={!user ? <Navigate to="/login" /> : <FriendsPage />}
          />
          <Route
            path="/:username/photos"
            element={!user ? <Navigate to="/login" /> : <PhotosPage />}
          />
          <Route path="/:username/setting" element={<SettingPage />} />
          <Route path="/404" element={<p>Not found</p>} />
          <Route path="/login" element={!user ? <AuthPage /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to={'/404'} />} />
        </Routes>
      )}
    </>
  );
}

export default App;
