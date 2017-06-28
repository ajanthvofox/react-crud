/*
 *
 * EditPostPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  RESET_POST,
  SAVE_POST,
  SAVE_POST_SUCCESS,
  SAVE_POST_ERROR,
  LOAD_POST,
  LOAD_POST_SUCCESS,
  LOAD_POST_ERROR,
  CHANGE_POST_ID,
  INI_POST_DATA,
} from './constants';

const initialState = fromJS({});

function editPostPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_POST:
      return state.set('post', {loading: 'Loading'});
    case LOAD_POST_SUCCESS:
      return state.set('post', action.data);
    case LOAD_POST_ERROR:
      return state.set('post', {loading: 'Error'});
    case SAVE_POST:
      return state.set('post', action.data).set('loading', 'Loading');
    case SAVE_POST_SUCCESS:
      return state.set('post', action.data).set('pid','').set('loading', '');
    case SAVE_POST_ERROR:
      return state.set('post', {error:'Error'}).set('loading', '');
    case CHANGE_POST_ID:
      return state.set('pid', action.pid);
    case RESET_POST:
      return state.set('post', {}).set('pid','');
    case INI_POST_DATA:
      return state
    default:
      return state;
  }
}

export default editPostPageReducer;
