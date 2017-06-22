// import { take, call, put, select } from 'redux-saga/effects';
import { take, takeLatest, call, put, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import {
  LOAD_POST,
  LOAD_POST_SUCCESS,
  LOAD_POST_ERROR,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR
} from './constants';

import {
  loadPostAction,
  loadPostSuccessAction,
  loadPostErrorAction,
  deletePostAction,
  deletePostSuccessAction,
  deletePostErrorAction,
  changePostId,
} from './actions';

import { selectPostId } from './selectors';

// Saga to load single post data
function* loadPost() {
  const pid = yield select(selectPostId());
  //console.log(pid);
  const url = `https://jsonplaceholder.typicode.com/posts/${pid}`;
  const params = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try{
    const data = yield call(request, url, params);
    //console.log(data);
    yield put(loadPostSuccessAction(data));
  } catch(err) {
    yield put(loadPostErrorAction(err));
  }
}

export function* postloadSaga() {
  yield takeLatest(LOAD_POST, loadPost);
}

// Saga to delete post
function* deletePost() {
  const pid = yield select(selectPostId());
  //console.log(pid);
  const url = `https://jsonplaceholder.typicode.com/posts/${pid}`;
  const params = {
    method: 'DELETE'
  };
  try{
    const data = yield call(request, url, params);
    //console.log(data);
    yield put(deletePostSuccessAction(data));
  } catch(err) {
    yield put(deletePostErrorAction(err));
  }
}

export function* postdeleteSaga() {
  yield takeLatest(DELETE_POST, deletePost);
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
