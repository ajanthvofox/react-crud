/*
 *
 * PostsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR
} from './constants';

const initialState = fromJS({});

function postsPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_POSTS:
      return state;
    case LOAD_POSTS_SUCCESS:
      return state.set('posts', action.data);
    case LOAD_POSTS_ERROR:
      return state;
    default:
      return state;
  }
}

export default postsPageReducer;
