import { createSelector } from 'reselect';

/**
 * Direct selector to the editPostPage state domain
 */
const selectEditPostPageDomain = () => (state) => state.get('editPostPage');

/**
 * Selecter to save post data
 */
const selectPost = () => createSelector(
  selectEditPostPageDomain(),
  (editPostPage) => editPostPage.get('post')
);

/**
 * Selecter to get post title
 */
const selectPostTitle = () => createSelector(
  selectEditPostPageDomain(),
  (editPostPage) => editPostPage.get('ptitle')
);

/**
 * Selecter to get post body
 */
const selectPostBody = () => createSelector(
  selectEditPostPageDomain(),
  (editPostPage) => editPostPage.get('pbody')
);

/**
 * Default selector used by EditPostPage
 */

const makeSelectEditPostPage = () => createSelector(
  selectEditPostPageDomain(),
  (substate) => substate.toJS()
);

//export default makeSelectEditPostPage;

export {
  selectEditPostPageDomain,
  selectPost,
  selectPostTitle,
  selectPostBody,
  makeSelectEditPostPage,
};
