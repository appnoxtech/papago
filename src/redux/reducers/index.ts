import {combineReducers} from 'redux';
import UserReducer from './user';
import ActivitReducer from './activity';
import {RecordStatusReducer} from './record.reducer';
import RecordActivityReducer from './recordActivityReducer';
import MapReducer from './map.reducer';
import PlanTripReducer from './planTrip.reducer';

const appReducer = combineReducers({
  user: UserReducer,
  activity: ActivitReducer,
  recordStatus: RecordStatusReducer,
  recordActivity: RecordActivityReducer,
  mapData: MapReducer,
  planTrip: PlanTripReducer
});

export const rootReducers = (state, action) => {
  return appReducer(state, action);
};
