
import { fromJS } from 'immutable';
import editPostPageReducer from '../reducer';

describe('editPostPageReducer', () => {
  it('returns the initial state', () => {
    expect(editPostPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
