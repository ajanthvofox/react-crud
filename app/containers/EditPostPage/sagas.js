// import { take, call, put, select } from 'redux-saga/effects';
import { take, takeLatest, call, put, select } from 'redux-saga/effects';
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
  selectPostTitle,
  selectPostBody,
} from './selectors';

// Saga to load single post data
function* savePost() {
  const pid = yield select(selectPostId());
  const ptitle = yield select(selectPostTitle());
  const pbody = yield select(selectPostBody());

  //console.log(pdata);
  if(pid) {
    const url = `https://jsonplaceholder.typicode.com/posts/${pid}`;
    const params = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        'id': pid,
        'title': ptitle,
        'body': pbody,
        'userId': 1
      }
    };
    //console.log(params);
    try{
      const data = yield call(request, url, params);
      //console.log(data);
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
      data: {
        'title': ptitle,
        'body': pbody,
        'userId': 1
      }
    };
    //console.log(params);
    try{
      const data = yield call(request, url, params);
      //console.log(data);
      yield put(savePostSuccessAction(data));
    } catch(err) {
      yield put(savePostErrorAction(err));
    }
  }


}

export function* postsaveSaga() {
  yield takeLatest(SAVE_POST, savePost);
}

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

// Saga to load single post data
function* loadPost() {
  const pid = yield select(selectPostId());
  console.log(pid);
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

// All sagas to be loaded
export default [
  defaultSaga,
  postsaveSaga,
  postloadSaga,
];
