import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, take } from 'redux-saga/effects';
import { LoginFormData } from 'shared/types';
import { userAction } from 'store/slice/userSlice';
import History from 'utils/history';
import * as api from '../../api/userApi';

function* handleLogin(payload: LoginFormData) {
  try {
    const { user, token, refreshToken } = yield call(api.loginUser, payload);
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refreshToken);
    yield put(userAction.setUser(user));
    History.push('/');
  } catch (error) {
    yield put(userAction.loginUserFailure(error.response.data));
  }
}

function* handleLogout() {
  localStorage.removeItem('token');
  yield put(userAction.logoutUser());
  History.push('/');
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('token'));

    if (!isLoggedIn) {
      const action1: PayloadAction<LoginFormData> = yield take(userAction.loginUserRequest.type);
      yield fork(handleLogin, action1.payload);
    }

    yield take([userAction.logoutUser.type, userAction.loginUserFailure.type]);
    yield call(handleLogout);
  }
}

export function* userSaga() {
  yield fork(watchLoginFlow);
}
