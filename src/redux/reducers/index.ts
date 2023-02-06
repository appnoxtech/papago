import {combineReducers} from 'redux';
import UserReducer from './user';
import ActivitReducer from './activity';
import {RecordStatusReducer} from './record.reducer';

const appReducer = combineReducers({
  user: UserReducer,
  activity: ActivitReducer,
  recordStatus: RecordStatusReducer,
});

export const rootReducers = (state, action) => {
  return appReducer(state, action);
};
