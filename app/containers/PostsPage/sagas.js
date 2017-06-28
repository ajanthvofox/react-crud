// import { take, call, put, select } from 'redux-saga/effects';
import { take, takeLatest, call, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

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
function* loadPosts(param) {
  console.log(param.page);
  const start = (param.page - 1)*10;
  const url = 'https://jsonplaceholder.typicode.com/posts?_start='+start+'&_limit=10';
  const params = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try{
    const data = yield call(request, url, params);
    yield put(loadPostsSuccessAction(data));
  } catch(err) {
    yield put(loadPostsErrorAction(err));
  }
}

export function* postsloadSaga() {
  const watcher = yield takeLatest(LOAD_POSTS, loadPosts);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
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
