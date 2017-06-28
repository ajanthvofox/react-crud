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
 * Selecter for loading status
 */
const selectLoading = () => createSelector(
  selectEditPostPageDomain(),
  (editPage) => editPage.get('loading')
);

/**
 * Selecter for post Id
 */
const selectPostId = () => createSelector(
  selectEditPostPageDomain(),
  (editPage) => editPage.get('pid')
);

/**
 * Default selector used by EditPostPage
 */

const makeSelectEditPostPage = () => createSelector(
  selectEditPostPageDomain(),
  (substate) => substate.toJS()
);

// export default makeSelectEditPostPage;

export {
  selectEditPostPageDomain,
  selectPost,
  selectPostId,
  selectLoading,
  makeSelectEditPostPage,
};
