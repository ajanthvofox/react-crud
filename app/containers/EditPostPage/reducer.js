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
  SET_POST_TITLE,
  SET_POST_BODY,
  INI_POST_DATA,
} from './constants';

const initialState = fromJS({});

function editPostPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_POST:
      return state;
    case LOAD_POST_SUCCESS:
      return state.set('post', action.data).set('ptitle',action.data.title).set('pbody',action.data.body);
    case LOAD_POST_ERROR:
      return state;
    case SAVE_POST:
      return state;
    case SAVE_POST_SUCCESS:
      return state.set('post', action.data).set('pid','').set('ptitle','').set('pbody','');
    case SAVE_POST_ERROR:
      return state.set('post', {error:'Error'});
    case CHANGE_POST_ID:
      //console.log(action.pid);
      return state.set('pid', action.pid);
    case SET_POST_TITLE:
      return state.set('ptitle', action.title);
    case SET_POST_BODY:
      // return {
      //   ...state, pbody:action.body
      // };
      return state.set('pbody', action.body);
    case RESET_POST:
      return state.set('post', {}).set('pid','').set('ptitle','').set('pbody','');
    case INI_POST_DATA:
      return state
        .set('ptitle', '')
        .set('pbody', '');
    default:
      return state;
  }
}

export default editPostPageReducer;
