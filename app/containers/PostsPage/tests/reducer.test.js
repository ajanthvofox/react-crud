
import { fromJS } from 'immutable';
import postsPageReducer from '../reducer';

describe('postsPageReducer', () => {
  it('returns the initial state', () => {
    expect(postsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
