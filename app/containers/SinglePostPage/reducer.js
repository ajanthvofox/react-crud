/*
 *
 * SinglePostPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
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
      return state.set('post', { loading: 'Loading' });
    case LOAD_POST_SUCCESS:
      return state.set('post', action.data);
    case LOAD_POST_ERROR:
      return state.set('post', { loading: 'Error' });
    case DELETE_POST:
      return state.set('loading', 'Loading');
    case DELETE_POST_SUCCESS:
      return state.set('post', { success: 'Success' }).set('loading', '');
    case DELETE_POST_ERROR:
      return state.set('post', { error: 'Error' }).set('loading', '');
    case CHANGE_POST_ID:
      return state.set('pid', action.pid);
    default:
      return state;
  }
}

export default singlePostPageReducer;
