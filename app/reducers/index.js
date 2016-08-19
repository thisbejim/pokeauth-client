// @flow
import { combineReducers } from 'redux';
import { poke } from './poke';
import { developer } from './developer';
import { user } from './user';
import { admin } from './admin';
import { forms } from './forms';

export const reducer = combineReducers({
  poke,
  developer,
  user,
  admin,
  forms,
});
