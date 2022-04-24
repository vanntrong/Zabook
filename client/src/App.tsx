import { getProfileApi } from 'api/userApi';
import SimpleLoading from 'components/loadings/simpleLoading/SimpleLoading';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { postAction } from 'store/slice/postSlice';
import { selectCurrentUser, userAction } from 'store/slice/userSlice';
import './app.scss';

const Login = lazy(() => import('pages/login/Login'));
const SignupPage = lazy(() => import('pages/signup/SignUpPage'));
const HomePage = lazy(() => import('pages/home/HomePage'));
const ProfilePage = lazy(() => import('pages/profile/ProfilePage'));
const PhotosPage = lazy(() => import('pages/photo/PhotosPage'));
const FriendsPage = lazy(() => import('pages/friends/FriendsPage'));
const SettingPage = lazy(() => import('pages/setting/SettingPage'));

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
      {isFetchingUser && <SimpleLoading />}
      {!isFetchingUser && (
        <Suspense fallback={<SimpleLoading />}>
          <Routes>
            <Route path="/404" element={<p>Not found</p>} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <SignupPage /> : <Navigate to="/" />} />
            <Route path="/" element={!user ? <Navigate to="/login" /> : <HomePage />} />
            <Route path="/:username" element={!user ? <Navigate to="/login" /> : <ProfilePage />} />
            <Route
              path="/:username/photos"
              element={!user ? <Navigate to="/login" /> : <PhotosPage />}
            />
            <Route
              path="/:username/friends"
              element={!user ? <Navigate to="/login" /> : <FriendsPage />}
            />
            <Route path="/badges" element={!user ? <Navigate to="/login" /> : <p>Badges</p>} />
            <Route path="/stories" element={!user ? <Navigate to="/login" /> : <p>stories</p>} />
            <Route path="/groups" element={!user ? <Navigate to="/login" /> : <p>groups</p>} />
            <Route path="/settings" element={!user ? <Navigate to="/login" /> : <SettingPage />} />
            <Route path="/messages" element={!user ? <Navigate to="/login" /> : <p>messages</p>} />
            <Route path="/404" element={<p>404</p>} />

            <Route path="*" element={<Navigate to={'/404'} />} />
          </Routes>
        </Suspense>
      )}
    </>
  );
}

export default App;
