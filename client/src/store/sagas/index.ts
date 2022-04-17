import { all } from 'redux-saga/effects';
import { userSaga } from './authSaga';
import { postSaga } from './postSaga';

// interface error {
//   message: any;
// }

// function* registerUserSaga(action: PayloadAction): unknown {
//   try {
//     const user = yield call(api.registerUser, action.payload);
//     yield put(actions.setUser(user));
//   } catch (error: unknown) {
//     console.log(error);
//     yield put(actions.registerUserFailure((error as Error).message));
//   }
// }

// function* loginUserSaga(action: PayloadAction): unknown {
//   try {
//     const user = yield call(api.loginUser, action.payload);
//     console.log('Login saga');
//     console.log(user);
//     yield put(actions.setUser(user));
//   } catch (error: unknown) {
//     console.log(error);
//     yield put(actions.loginUserFailure((error as Error).message));
//   }
// }

// export function* mySaga() {
//   yield takeLatest(actions.registerUserRequest, registerUserSaga);
//   yield takeLatest(actions.loginUserRequest, loginUserSaga);
// }

export default function* rootSaga() {
  yield all([userSaga(), postSaga()]);
}
