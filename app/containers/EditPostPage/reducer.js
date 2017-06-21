/*
 *
 * EditPostPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SAVE_POST,
  SAVE_POST_SUCCESS,
  SAVE_POST_ERROR,
  SET_POST_TITLE,
  SET_POST_BODY,
  INI_POST_DATA,
} from './constants';

const initialState = fromJS({});

function editPostPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SAVE_POST:
      return state;
    case SAVE_POST_SUCCESS:
      return state.set('post', action.data);
    case SAVE_POST_ERROR:
      return state;
    case SET_POST_TITLE:
      return {
        ...state, ptitle:action.title
      };
    case SET_POST_BODY:
      return {
        ...state, pbody:action.body
      };
    case INI_POST_DATA:
      return state
        .set('ptitle', '')
        .set('pbody', '');
    default:
      return state;
  }
}

export default editPostPageReducer;
