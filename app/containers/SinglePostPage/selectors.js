import { createSelector } from 'reselect';

/**
 * Direct selector to the SinglePostPage state domain
 */
const selectSinglePostPageDomain = () => (state) => state.get('singlePostPage');

/**
 * Selecter for single post data
 */
const selectPost = () => createSelector(
  selectSinglePostPageDomain(),
  (postPage) => postPage.get('post')
);

/**
 * Selecter for post Id
 */
const selectPostId = () => createSelector(
  selectSinglePostPageDomain(),
  (postPage) => postPage.get('postId')
);

/**
 * Default selector used by SinglePostPage
 */

const makeSelectSinglePostPage = () => createSelector(
  selectSinglePostPageDomain(),
  (substate) => substate.toJS()
);

export {
  selectSinglePostPageDomain,
  selectPost,
  selectPostId,
  makeSelectSinglePostPage,
};
