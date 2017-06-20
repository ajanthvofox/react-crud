// import { take, call, put, select } from 'redux-saga/effects';
import { take, takeLatest, call, put, select } from 'redux-saga/effects';

import request from 'utils/request';

import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR
} from './constants';

import {
  loadPostsAction,
  loadPostsSuccessAction,
  loadPostsErrorAction
} from './actions'

// Saga to load posts data
function* loadPosts() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const params = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try{
    const data = yield call(request, url, params);
    //console.log(data);
    yield put(loadPostsSuccessAction(data));
  } catch(err) {
    yield put(loadPostsErrorAction(err));
  }
}

export function* postsloadSaga() {
  yield takeLatest(LOAD_POSTS, loadPosts);
}

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

// All sagas to be loaded
export default [
  defaultSaga,
  postsloadSaga,
];
