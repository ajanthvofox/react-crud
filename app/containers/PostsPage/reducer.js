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
  LOAD_POSTS_ERROR,
  LOAD_SET_PAGE,
} from './constants';

const initialState = fromJS({});

function postsPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_POSTS:
      return state.set('loading', 'Loading');
    case LOAD_POSTS_SUCCESS:
      return state.set('posts', action.data).set('loading', '');
    case LOAD_POSTS_ERROR:
      return state.set('loading', '');
    case LOAD_SET_PAGE:
      return state.set('page', action.page);
    default:
      return state;
  }
}

export default postsPageReducer;
