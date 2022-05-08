import { getProfileApi } from 'api/userApi';
import SimpleLoading from 'components/loadings/simpleLoading/SimpleLoading';
import ViewStoryPage from 'pages/stories/view/ViewStoryPage';
import PrivateRoute from 'PrivateRoute';
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
const AssetsPage = lazy(() => import('pages/photo/AssetsPage'));
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

  useEffect(() => {
    socket.on('getOnlineUsers', (data) => {
      dispatch(userAction.setOnlineUsers(data));
    });
  }, []);

  return (
    <>
      {isFetchingUser && <SimpleLoading />}
      {!isFetchingUser && (
        <Suspense fallback={<SimpleLoading />}>
          <Routes>
            {/* login route */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <SignupPage /> : <Navigate to="/" />} />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />

            {/* profile route */}
            <Route path="/:username">
              <Route
                index
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="photos"
                element={
                  <PrivateRoute>
                    <AssetsPage type="photos" />
                  </PrivateRoute>
                }
              />
              <Route
                path="videos"
                element={
                  <PrivateRoute>
                    <AssetsPage type="videos" />
                  </PrivateRoute>
                }
              />
              <Route path="friends">
                <Route
                  index
                  element={
                    <PrivateRoute>
                      <FriendsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="request"
                  element={
                    <PrivateRoute>
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
                <PrivateRoute>
                  <p>Badges</p>
                </PrivateRoute>
              }
            />

            {/* stories route */}
            <Route path="/stories">
              <Route
                index
                element={
                  <PrivateRoute>
                    <StoriesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="create"
                element={
                  <PrivateRoute>
                    <CreateStoryPage />
                  </PrivateRoute>
                }
              />
              <Route
                path=":storyId"
                element={
                  <PrivateRoute>
                    <ViewStoryPage />
                  </PrivateRoute>
                }
              />
            </Route>

            {/* messages route */}
            <Route
              path="/groups"
              element={
                <PrivateRoute>
                  <p>groups</p>
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingPage />
                </PrivateRoute>
              }
            />
            <Route path="/messages">
              <Route
                index
                element={
                  <PrivateRoute>
                    <MessagesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path=":conversationId"
                element={
                  <PrivateRoute>
                    <MessagesPage />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path="/404" element={<NotFoundPage />} />

            <Route path="*" element={<Navigate to={'/404'} />} />
          </Routes>
        </Suspense>
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
