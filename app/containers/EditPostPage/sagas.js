// import { take, call, put, select } from 'redux-saga/effects';
import { take, takeLatest, call, put, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import {
  SAVE_POST,
  SAVE_POST_SUCCESS,
  SAVE_POST_ERROR
} from './constants';

import {
  savePostAction,
  savePostSuccessAction,
  savePostErrorAction,
  getPostData,
} from './actions';

import { selectPostData } from './selectors';

// Saga to load single post data
function* savePost() {
  //const pdata = yield select(selectPostData());
  //console.log(pdata);
  const url = `https://jsonplaceholder.typicode.com/posts/`;
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {

    }
  };
  try{
    const data = yield call(request, url, params);
    //console.log(data);
    yield put(savePostSuccessAction(data));
  } catch(err) {
    yield put(savePostErrorAction(err));
  }
}

export function* postsaveSaga() {
  yield takeLatest(SAVE_POST, savePost);
}

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

// All sagas to be loaded
export default [
  defaultSaga,
  postsaveSaga,
];
