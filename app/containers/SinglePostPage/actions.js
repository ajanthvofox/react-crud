/*
 *
 * SinglePostPage actions
 *
 */

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

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function deletePostAction() {
  return {
    type: DELETE_POST,
  };
}

export function deletePostSuccessAction(data) {
  return {
    type: DELETE_POST_SUCCESS,
    data,
  };
}

export function deletePostErrorAction() {
  return {
    type: DELETE_POST_ERROR,
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
  return {
    type: CHANGE_POST_ID,
    pid,
  };
}
