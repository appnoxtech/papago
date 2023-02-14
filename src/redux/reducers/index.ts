import {combineReducers} from 'redux';
import UserReducer from './user';
import ActivitReducer from './activity';
import {RecordStatusReducer} from './record.reducer';
import RecordActivityReducer from './recordActivityReducer';

const appReducer = combineReducers({
  user: UserReducer,
  activity: ActivitReducer,
  recordStatus: RecordStatusReducer,
  recordActivity: RecordActivityReducer
});

export const rootReducers = (state, action) => {
  return appReducer(state, action);
};
