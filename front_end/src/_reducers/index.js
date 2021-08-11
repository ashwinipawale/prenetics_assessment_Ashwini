import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { profile } from './profile.reducer';
import {genResult} from './geneticresult.reducer'

const rootReducer = combineReducers({
  authentication,
  profile,
  genResult,
  alert
});

export default rootReducer;