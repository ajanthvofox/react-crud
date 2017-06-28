/*
 *
 * PostsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR,
  LOAD_SET_PAGE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadPostsAction(page) {
  return {
    type: LOAD_POSTS,
    page,
  };
}

export function loadSetPage(page) {
  return {
    type: LOAD_SET_PAGE,
    page,
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
