import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, take } from 'redux-saga/effects';
import { LoginFormData } from 'shared/types';
import { userAction } from 'store/slice/userSlice';
import * as api from '../../api/userApi';
import History from 'utils/history';

function* handleLogin(payload: LoginFormData) {
  try {
    const { user, token, refreshToken } = yield call(api.loginUser, payload);
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refreshToken);
    yield put(userAction.setUser(user));
    History.push('/');
  } catch (error) {
    console.log(error);
    yield put(userAction.loginUserFailure(error.message));
  }
}

function* handleLogout() {
  localStorage.removeItem('token');
  yield put(userAction.logoutUser());
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('token'));

    if (!isLoggedIn) {
      const action1: PayloadAction<LoginFormData> = yield take(userAction.loginUserRequest.type);
      yield fork(handleLogin, action1.payload);
    }

    yield take(userAction.logoutUser.type);
    yield fork(handleLogout);
  }
}

export function* userSaga() {
  yield fork(watchLoginFlow);
}
