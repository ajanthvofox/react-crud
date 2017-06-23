/*
 *
 * EditPostPage actions
 *
 */

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

export function resetPostAction() {
  return {
    type: RESET_POST,
  };
}

export function savePostAction(data) {
  return {
    type: SAVE_POST,
    data
  };
}

export function savePostSuccessAction(data) {
  data.success = "Success";
  return {
    type: SAVE_POST_SUCCESS,
    data,
  };
}

export function savePostErrorAction() {
  return {
    type: SAVE_POST_ERROR,
  };
}

export function iniPostData() {
  return {
    type: INI_POST_DATA,
  };
}

export function changePostId(pid) {
  return {
    type: CHANGE_POST_ID,
    pid,
  };
}
