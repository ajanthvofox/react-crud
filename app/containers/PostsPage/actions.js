/*
 *
 * PostsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadPostsAction() {
  return {
    type: LOAD_POSTS,
  };
}

export function loadPostsSuccessAction(data) {
  return {
    type: LOAD_POSTS_SUCCESS,
    data,
  };
}

export function loadPostsErrorAction() {
  return {
    type: LOAD_POSTS_ERROR,
  };
}
