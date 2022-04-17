import { call, put, take, takeLatest } from 'redux-saga/effects';
import { formPostData, PostType } from 'shared/types';
import { postAction } from '../slice/postSlice';
import * as postApi from 'api/postApi';

// { payload, type }: { payload: string; type: string }
function* getPostsSaga({ payload, type }: { payload: string; type: string }) {
  try {
    const posts: PostType[] = yield call(postApi.getPostsApi, payload);
    yield put(postAction.setUserPosts(posts));
  } catch (error) {
    yield put(postAction.getCurrentUserPostsFailure(error.response.data));
  }
}

function* createPostSaga({ payload, type }: { payload: formPostData; type: string }) {
  try {
    const post: PostType = yield call(postApi.createPostApi, payload);
    yield put(postAction.createNewPostSuccess(post));
  } catch (error) {
    yield put(postAction.createNewPostFailure(error.response.data));
  }
}

export function* postSaga() {
  yield takeLatest(postAction.getCurrentUserPostsRequest.type, getPostsSaga);
  yield takeLatest(postAction.createNewPostRequest.type, createPostSaga);
}
