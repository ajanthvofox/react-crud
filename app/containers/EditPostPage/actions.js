/*
 *
 * EditPostPage actions
 *
 */

 import {
   DEFAULT_ACTION,
   SAVE_POST,
   SAVE_POST_SUCCESS,
   SAVE_POST_ERROR,
   SET_POST_TITLE,
   SET_POST_BODY,
   INI_POST_DATA,
 } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function savePostAction() {
  return {
    type: SAVE_POST,
  };
}

export function savePostSuccessAction(data) {
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

export function setPostTitle(title) {
  return {
    type: SET_POST_TITLE,
    title
  };
}

export function setPostBody(body) {
  return {
    type: SET_POST_BODY,
    body
  };
}
