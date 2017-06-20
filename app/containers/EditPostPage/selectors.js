import { createSelector } from 'reselect';

/**
 * Direct selector to the editPostPage state domain
 */
const selectEditPostPageDomain = () => (state) => state.get('editPostPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EditPostPage
 */

const makeSelectEditPostPage = () => createSelector(
  selectEditPostPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectEditPostPage;
export {
  selectEditPostPageDomain,
};
