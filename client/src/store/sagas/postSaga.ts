import { getPostsApi } from 'api/postApi';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { PostType } from 'shared/types';
import { postAction } from '../slice/postSlice';

// { payload, type }: { payload: string; type: string }
function* getPosts({ payload, type }: { payload: string; type: string }) {
  try {
    console.log('Handle get posts saga');
    const posts: PostType[] = yield call(getPostsApi, payload);
    yield put(postAction.setUserPosts(posts));
    // console.log(posts);
  } catch (error) {
    yield put(postAction.getCurrentUserPostsFailure(error));
  }
}

export function* postSaga() {
  yield takeEvery(postAction.getCurrentUserPostsRequest.type, getPosts);
}
