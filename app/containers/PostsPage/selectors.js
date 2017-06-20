import { createSelector } from 'reselect';

/**
 * Direct selector to the postsPage state domain
 */
const selectPostsPageDomain = () => (state) => state.get('postsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PostsPage
 */

const makeSelectPostsPage = () => createSelector(
  selectPostsPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectPostsPage;
export {
  selectPostsPageDomain,
};
