import { getProfileApi } from 'api/userApi';
import SimpleLoading from 'components/loadings/simpleLoading/SimpleLoading';
import ViewStoryPage from 'pages/stories/view/ViewStoryPage';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCurrentUser, userAction } from 'store/slice/userSlice';
import { socket } from 'utils/socket';
import './app.scss';

const Login = lazy(() => import('pages/login/Login'));
const SignupPage = lazy(() => import('pages/signup/SignUpPage'));
const HomePage = lazy(() => import('pages/home/HomePage'));
const ProfilePage = lazy(() => import('pages/profile/ProfilePage'));
const PhotosPage = lazy(() => import('pages/photo/PhotosPage'));
const FriendsPage = lazy(() => import('pages/friends/FriendsPage'));
const FriendsRequestsPage = lazy(() => import('pages/friends/requests/FriendsRequestsPage'));
const SettingPage = lazy(() => import('pages/setting/SettingPage'));
const NotFoundPage = lazy(() => import('pages/404/NotFoundPage'));
const CreateStoryPage = lazy(() => import('pages/stories/create/CreateStoryPage'));
const StoriesPage = lazy(() => import('pages/stories/StoriesPage'));
const MessagesPage = lazy(() => import('pages/messages/MessagesPage'));

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
    if (user) {
      socket.emit('setup', user);
    }
  }, [user]);

  return (
    <>
      {isFetchingUser && <SimpleLoading />}
      {!isFetchingUser && (
        <Suspense fallback={<SimpleLoading />}>
          <Routes>
            {/* login route */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <SignupPage /> : <Navigate to="/" />} />
            <Route path="/" element={!user ? <Navigate to="/login" /> : <HomePage />} />

            {/* profile route */}
            <Route path="/:username">
              <Route index element={!user ? <Navigate to="/login" /> : <ProfilePage />} />
              <Route path="photos" element={!user ? <Navigate to="/login" /> : <PhotosPage />} />
              <Route path="friends">
                <Route index element={!user ? <Navigate to="/login" /> : <FriendsPage />} />
                <Route
                  path="request"
                  element={!user ? <Navigate to="/login" /> : <FriendsRequestsPage />}
                />
              </Route>
            </Route>

            {/* badges route */}
            <Route path="/badges" element={!user ? <Navigate to="/login" /> : <p>Badges</p>} />

            {/* stories route */}
            <Route path="/stories">
              <Route index element={!user ? <Navigate to="/login" /> : <StoriesPage />} />
              <Route
                path="create"
                element={!user ? <Navigate to="/login" /> : <CreateStoryPage />}
              />
              <Route
                path=":storyId"
                element={!user ? <Navigate to="/login" /> : <ViewStoryPage />}
              />
            </Route>

            {/* messages route */}
            <Route path="/groups" element={!user ? <Navigate to="/login" /> : <p>groups</p>} />
            <Route path="/settings" element={!user ? <Navigate to="/login" /> : <SettingPage />} />
            <Route path="/messages">
              <Route index element={!user ? <Navigate to="/login" /> : <MessagesPage />} />
              <Route
                path=":conversationId"
                element={!user ? <Navigate to="/login" /> : <MessagesPage />}
              />
            </Route>
            <Route path="/404" element={<NotFoundPage />} />

            <Route path="*" element={<Navigate to={'/404'} />} />
          </Routes>
        </Suspense>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
