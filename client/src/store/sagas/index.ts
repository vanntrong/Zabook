import { all } from 'redux-saga/effects';
import { userSaga } from './authSaga';

export default function* rootSaga() {
  yield all([userSaga()]);
}
