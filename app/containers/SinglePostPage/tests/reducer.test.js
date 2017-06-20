
import { fromJS } from 'immutable';
import SinglePostPageReducer from '../reducer';

describe('SinglePostPageReducer', () => {
  it('returns the initial state', () => {
    expect(SinglePostPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
