// import { take, call, put, select } from 'redux-saga/effects';
import { take, takeLatest, call, put, select, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import {
  LOAD_POST,
  DELETE_POST,
} from './constants';

import {
  loadPostSuccessAction,
  loadPostErrorAction,
  deletePostSuccessAction,
  deletePostErrorAction,
} from './actions';

import { selectPostId } from './selectors';

// Saga to load single post data
function* loadPost() {
  const pid = yield select(selectPostId());
  const url = `https://jsonplaceholder.typicode.com/posts/${pid}`;
  const params = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const data = yield call(request, url, params);
    yield put(loadPostSuccessAction(data));
  } catch (err) {
    yield put(loadPostErrorAction(err));
  }
}

export function* postloadSaga() {
  const loadSingleWatcher = yield takeLatest(LOAD_POST, loadPost);
  yield take(LOCATION_CHANGE);
  yield cancel(loadSingleWatcher);
}

// Saga to delete post
function* deletePost() {
  const pid = yield select(selectPostId());
  const url = `https://jsonplaceholder.typicode.com/posts/${pid}`;
  const params = {
    method: 'DELETE',
  };
  try {
    const data = yield call(request, url, params);
    yield put(deletePostSuccessAction(data));
  } catch (err) {
    yield put(deletePostErrorAction(err));
  }
}

export function* postdeleteSaga() {
  const deletePostWatcher = yield takeLatest(DELETE_POST, deletePost);
  yield take(LOCATION_CHANGE);
  yield cancel(deletePostWatcher);
}

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

// All sagas to be loaded
export default [
  defaultSaga,
  postloadSaga,
  postdeleteSaga,
];
