/*
 *
 * SinglePostPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_POST,
  LOAD_POST_SUCCESS,
  LOAD_POST_ERROR,
  CHANGE_POST_ID,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadPostAction() {
  return {
    type: LOAD_POST,
  };
}

export function loadPostSuccessAction(data) {
  return {
    type: LOAD_POST_SUCCESS,
    data,
  };
}

export function loadPostErrorAction() {
  return {
    type: LOAD_POST_ERROR,
  };
}

export function changePostId(pid) {
  console.log(pid);
  return {
    type: CHANGE_POST_ID,
    pid,
  };
}
