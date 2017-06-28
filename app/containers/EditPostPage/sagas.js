// import { take, call, put, select } from 'redux-saga/effects';
import { take, takeLatest, call, put, select, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import {
  SAVE_POST,
  SAVE_POST_SUCCESS,
  SAVE_POST_ERROR,
  LOAD_POST,
  LOAD_POST_SUCCESS,
  LOAD_POST_ERROR
} from './constants';

import {
  savePostAction,
  savePostSuccessAction,
  savePostErrorAction,
  loadPostAction,
  loadPostSuccessAction,
  loadPostErrorAction,
  changePostId,
} from './actions';

import {
  selectPostId,
  selectPost,
} from './selectors';

// Saga to load single post data
function* savePost() {
  const pid = yield select(selectPostId());
  const pdata = yield select(selectPost());
  if(pid) {
    const url = `https://jsonplaceholder.typicode.com/posts/${pid}`;
    const params = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: pdata
    };
    try{
      const data = yield call(request, url, params);
      yield put(savePostSuccessAction(data));
    } catch(err) {
      yield put(savePostErrorAction(err));
    }
  }
  else {
    const url = `https://jsonplaceholder.typicode.com/posts`;
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: pdata
    };
    try{
      const data = yield call(request, url, params);
      yield put(savePostSuccessAction(data));
    } catch(err) {
      yield put(savePostErrorAction(err));
    }
  }
}

export function* postsaveSaga() {
  const savePostWatcher = yield takeLatest(SAVE_POST, savePost);
  yield take(LOCATION_CHANGE);
  yield cancel(savePostWatcher);
}

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

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
  try{
    const data = yield call(request, url, params);
    yield put(loadPostSuccessAction(data));
  } catch(err) {
    yield put(loadPostErrorAction(err));
  }
}

export function* postloadSaga() {
  const loadPostWatcher = yield takeLatest(LOAD_POST, loadPost);
  yield take(LOCATION_CHANGE);
  yield cancel(loadPostWatcher);
}

// All sagas to be loaded
export default [
  defaultSaga,
  postsaveSaga,
  postloadSaga,
];
