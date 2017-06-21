/*
 *
 * SinglePostPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_POST,
  LOAD_POST_SUCCESS,
  LOAD_POST_ERROR,
  CHANGE_POST_ID,
} from './constants';

const initialState = fromJS({});

function singlePostPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_POST:
      return state;
    case LOAD_POST_SUCCESS:
      return state.set('post', action.data);
    case LOAD_POST_ERROR:
      return state;
    case CHANGE_POST_ID:
      console.log(action.pid);
      return state.set('pid', action.pid);
    default:
      return state;
  }
}

export default singlePostPageReducer;
