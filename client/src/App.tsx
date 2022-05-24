import { getProfileApi } from 'api/userApi';
import SimpleLoading from 'components/loadings/simpleLoading/SimpleLoading';
import NotFoundPage from 'pages/404/NotFoundPage';
import FriendsPage from 'pages/friends/FriendsPage';
import FriendsRequestsPage from 'pages/friends/requests/FriendsRequestsPage';
import HomePage from 'pages/home/HomePage';
import MessagesPage from 'pages/messages/MessagesPage';
import AssetsPage from 'pages/photo/AssetsPage';
import PostViewPage from 'pages/postViewPage/PostViewPage';
import ProfilePage from 'pages/profile/ProfilePage';
import SettingPage from 'pages/setting/SettingPage';
import SignupPage from 'pages/signup/SignUpPage';
import CreateStoryPage from 'pages/stories/create/CreateStoryPage';
import StoriesPage from 'pages/stories/StoriesPage';
import ViewStoryPage from 'pages/stories/view/ViewStoryPage';
import PrivateRoute from 'PrivateRoute';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCurrentUser, userAction } from 'store/slice/userSlice';
import { socket } from 'utils/socket';
import './app.scss';
import LoginPage from './pages/login/Login';
import ForgotPasswordPage from './pages/forgot/ForgotPasswordPage';

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
      setIsFetchingUser(false);
    };
    getProfile();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      socket.emit('setup', user._id);
    }
    socket.on('getOnlineUsers', (data) => {
      dispatch(userAction.setOnlineUsers(data));
    });
  }, [user]);

  return (
    <>
      {isFetchingUser && <SimpleLoading />}
      {!isFetchingUser && (
        // <Suspense fallback={<SimpleLoading />}>
        <Routes>
          {/* login route */}
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <SignupPage /> : <Navigate to="/" />} />

          <Route
            path="/"
            element={
              <PrivateRoute isFetchingUser={isFetchingUser}>
                <HomePage />
              </PrivateRoute>
            }
          />

          {/* profile route */}
          <Route path="/:username">
            <Route
              index
              element={
                <PrivateRoute isFetchingUser={isFetchingUser}>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="photos"
              element={
                <PrivateRoute isFetchingUser={isFetchingUser}>
                  <AssetsPage type="photos" />
                </PrivateRoute>
              }
            />
            <Route
              path="videos"
              element={
                <PrivateRoute isFetchingUser={isFetchingUser}>
                  <AssetsPage type="videos" />
                </PrivateRoute>
              }
            />
            <Route path="friends">
              <Route
                index
                element={
                  <PrivateRoute isFetchingUser={isFetchingUser}>
                    <FriendsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="request"
                element={
                  <PrivateRoute isFetchingUser={isFetchingUser}>
                    <FriendsRequestsPage />
                  </PrivateRoute>
                }
              />
            </Route>
          </Route>

          {/* badges route */}
          <Route
            path="/badges"
            element={
              <PrivateRoute isFetchingUser={isFetchingUser}>
                <p>Badges</p>
              </PrivateRoute>
            }
          />

          {/* stories route */}
          <Route path="/stories">
            <Route
              index
              element={
                <PrivateRoute isFetchingUser={isFetchingUser}>
                  <StoriesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="create"
              element={
                <PrivateRoute isFetchingUser={isFetchingUser}>
                  <CreateStoryPage />
                </PrivateRoute>
              }
            />
            <Route
              path=":storyId"
              element={
                <PrivateRoute isFetchingUser={isFetchingUser}>
                  <ViewStoryPage />
                </PrivateRoute>
              }
            />
          </Route>

          {/* messages route */}

          <Route
            path="/settings"
            element={
              <PrivateRoute isFetchingUser={isFetchingUser}>
                <SettingPage />
              </PrivateRoute>
            }
          />
          <Route path="/messages">
            <Route
              index
              element={
                <PrivateRoute isFetchingUser={isFetchingUser}>
                  <MessagesPage />
                </PrivateRoute>
              }
            />
            <Route
              path=":conversationId"
              element={
                <PrivateRoute isFetchingUser={isFetchingUser}>
                  <MessagesPage />
                </PrivateRoute>
              }
            />
          </Route>

          <Route
            path="/posts/:postId"
            element={
              <PrivateRoute isFetchingUser={isFetchingUser}>
                <PostViewPage />
              </PrivateRoute>
            }
          />

          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/404" element={<NotFoundPage />} />

          <Route path="*" element={<Navigate to={'/404'} />} />
        </Routes>
        // </Suspense>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </>
  );
}

export default App;
