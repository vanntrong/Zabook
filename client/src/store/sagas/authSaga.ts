import { PayloadAction } from '@reduxjs/toolkit';
import * as Effects from 'redux-saga/effects';
import { LoginFormData, UserType } from 'shared/types';
import { updateUserPayload, userAction } from 'store/slice/userSlice';
import axiosClient from 'api';
import History from 'utils/history';
import * as api from '../../api/userApi';

const call: any = Effects.call;
const put: any = Effects.put;
const fork: any = Effects.fork;
const take: any = Effects.take;
const takeLatest: any = Effects.takeLatest;

function* handleLogin(payload: LoginFormData) {
  try {
    const { user, token, refreshToken } = yield call(api.loginUser, payload);
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refreshToken);
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    yield put(userAction.setUser(user));
    History.push('/');
  } catch (error) {
    yield put(userAction.loginUserFailure(error.response.data));
  }
}

function* handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  yield put(userAction.logoutUser());
  History.push('/');
}

function* handleUpdateUser(action: PayloadAction<updateUserPayload>) {
  try {
    const updatedUser: UserType = yield call(api.updateUserApi, action.payload);
    yield put(userAction.setUser(updatedUser));
    History.push('/');
  } catch (error) {
    yield put(userAction.updateUserFailure(error.response.data));
  }
}

function* handleAddHistory(action: PayloadAction<{ id: string; historyId: string }>) {
  try {
    const res: [string] = yield call(api.addHistoryApi, action.payload);
    yield put(userAction.addHistorySuccess(res));
  } catch (error) {
    yield put(userAction.addHistoryFailure(error.response.data));
  }
}

function* handleDeleteHistory(action: PayloadAction<{ id: string; historyId: string }>) {
  try {
    const res: [string] = yield call(api.deleteHistoryApi, action.payload);
    yield put(userAction.deleteHistorySuccess(res));
  } catch (error) {
    yield put(userAction.deleteHistoryFailure(error.response.data));
  }
}

function* handleDeleteFriend(action: PayloadAction<{ id: string; friendId: string }>) {
  try {
    const newFriendList: [string] = yield call(api.deleteFriendApi, action.payload);
    yield put(userAction.deleteFriendSuccess(newFriendList));
  } catch (error) {
    yield put(userAction.deleteFriendFailure(error.response.data));
  }
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
  yield takeLatest(userAction.updateUserRequest.type, handleUpdateUser);
  yield takeLatest(userAction.addHistoryRequest.type, handleAddHistory);
  yield takeLatest(userAction.deleteHistoryRequest.type, handleDeleteHistory);
  yield takeLatest(userAction.deleteFriendRequest.type, handleDeleteFriend);
}
