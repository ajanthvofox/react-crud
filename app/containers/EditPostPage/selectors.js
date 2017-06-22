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
  (editPage) => editPage.get('post')
);

/**
 * Selecter for post Id
 */
const selectPostId = () => createSelector(
  selectEditPostPageDomain(),
  (editPage) => editPage.get('pid')
);

/**
 * Selecter to get post title
 */
const selectPostTitle = () => createSelector(
  selectEditPostPageDomain(),
  (editPage) => editPage.get('ptitle')
);

/**
 * Selecter to get post body
 */
const selectPostBody = () => createSelector(
  selectEditPostPageDomain(),
  (editPage) => editPage.get('pbody')
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
  selectPostId,
  selectPostTitle,
  selectPostBody,
  makeSelectEditPostPage,
};
