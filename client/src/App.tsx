import { getStoriesApi } from 'api/storyApi';
import { getProfileApi } from 'api/userApi';
import SimpleLoading from 'components/loadings/simpleLoading/SimpleLoading';
import ViewStoryPage from 'pages/stories/view/ViewStoryPage';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { postAction } from 'store/slice/postSlice';
import { storiesAction } from 'store/slice/storiesSlice';
import { selectCurrentUser, userAction } from 'store/slice/userSlice';
import './app.scss';

const Login = lazy(() => import('pages/login/Login'));
const SignupPage = lazy(() => import('pages/signup/SignUpPage'));
const HomePage = lazy(() => import('pages/home/HomePage'));
const ProfilePage = lazy(() => import('pages/profile/ProfilePage'));
const PhotosPage = lazy(() => import('pages/photo/PhotosPage'));
const FriendsPage = lazy(() => import('pages/friends/FriendsPage'));
const SettingPage = lazy(() => import('pages/setting/SettingPage'));
const NotFoundPage = lazy(() => import('pages/404/NotFoundPage'));
const CreateStoryPage = lazy(() => import('pages/stories/create/CreateStoryPage'));

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

  useEffect(() => {
    const getStories = async () => {
      const res = await getStoriesApi({ page: 0 });
      dispatch(storiesAction.setStories(res));
    };
    getStories();
  }, [dispatch]);
  return (
    <>
      {isFetchingUser && <SimpleLoading />}
      {!isFetchingUser && (
        <Suspense fallback={<SimpleLoading />}>
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <SignupPage /> : <Navigate to="/" />} />
            <Route path="/" element={!user ? <Navigate to="/login" /> : <HomePage />} />

            <Route path="/:username">
              <Route index element={!user ? <Navigate to="/login" /> : <ProfilePage />} />
              <Route path="photos" element={!user ? <Navigate to="/login" /> : <PhotosPage />} />
              <Route path="friends" element={!user ? <Navigate to="/login" /> : <FriendsPage />} />
            </Route>

            <Route path="/badges" element={!user ? <Navigate to="/login" /> : <p>Badges</p>} />

            <Route path="/stories">
              <Route index element={!user ? <Navigate to="/login" /> : <p>stories</p>} />
              <Route
                path="create"
                element={!user ? <Navigate to="/login" /> : <CreateStoryPage />}
              />
              <Route
                path=":storyId"
                element={!user ? <Navigate to="/login" /> : <ViewStoryPage />}
              />
            </Route>
            <Route path="/groups" element={!user ? <Navigate to="/login" /> : <p>groups</p>} />
            <Route path="/settings" element={!user ? <Navigate to="/login" /> : <SettingPage />} />
            <Route path="/messages" element={!user ? <Navigate to="/login" /> : <p>messages</p>} />
            <Route path="/404" element={<NotFoundPage />} />

            <Route path="*" element={<Navigate to={'/404'} />} />
          </Routes>
        </Suspense>
      )}
    </>
  );
}

export default App;
