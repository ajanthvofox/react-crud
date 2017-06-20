import { createSelector } from 'reselect';

/**
 * Direct selector to the postsPage state domain
 */
const selectPostsPageDomain = () => (state) => state.get('postsPage');

/**
 * Selecter por posts data
 */
const selectPosts = () => createSelector(
  selectPostsPageDomain(),
  (postsPage) => postsPage.get('posts')
);

/**
 * Default selector used by PostsPage
 */

const makeSelectPostsPage = () => createSelector(
  selectPostsPageDomain(),
  (substate) => substate.toJS()
);

export {
  selectPostsPageDomain,
  selectPosts,
  makeSelectPostsPage
};
