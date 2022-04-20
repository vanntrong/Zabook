import * as Effects from 'redux-saga/effects';
import { formPostData, PostType } from 'shared/types';
import { postAction } from '../slice/postSlice';
import * as postApi from 'api/postApi';

const call: any = Effects.call;
const put: any = Effects.put;
const takeLatest: any = Effects.takeLatest;

// { payload, type }: { payload: string; type: string }
function* getPostsSaga({ payload, type }: { payload: string; type: string }) {
  try {
    const posts: PostType[] = yield call(postApi.getPostsApi, payload);
    yield put(postAction.setUserPosts(posts));
  } catch (error) {
    console.log(error.response);
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

function* updatePostSaga({
  payload,
  type,
}: {
  payload: { data: formPostData; id: string };
  type: string;
}) {
  try {
    const post: PostType = yield call(postApi.updatePostApi, payload);
    yield put(postAction.updatePostSuccess(post));
  } catch (error) {
    yield put(postAction.updatePostFailure(error.response.data));
  }
}

export function* postSaga() {
  yield takeLatest(postAction.getCurrentUserPostsRequest.type, getPostsSaga);
  yield takeLatest(postAction.createNewPostRequest.type, createPostSaga);
  yield takeLatest(postAction.updatePostRequest.type, updatePostSaga);
}
