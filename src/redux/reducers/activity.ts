import {activity, data} from '../../interfaces/Dashboard/record.interface';

const initialState = {
  selectedActivity: {},
  activityList: Array<activity>,
};

interface UpdateActivity {
  type: 'UPDATE_SELECTED_ACTIVITY';
  payload: data;
}

interface UpdateActivityList {
  type: 'UPDATE_ACTIVITY_LIST';
  payload: Array<activity>;
}

type action = UpdateActivityList | UpdateActivity;

const ActivitReducer = (state = initialState, action: action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_ACTIVITY': {
      return {
        ...state,
        selectedActivity: action.payload,
      };
    }

    case 'UPDATE_ACTIVITY_LIST': {
      return {
        ...state,
        activityList: action.payload,
      };
    }

    default:
      return state;
  }
};

export default ActivitReducer;

export const updateActivity = (activityData: data) => {
  return {
    type: 'UPDATE_SELECTED_ACTIVITY',
    payload: activityData,
  };
};

export const updateActivityList = (activityList: Array<activity>) => {
  return {
    type: 'UPDATE_ACTIVITY_LIST',
    payload: activityList,
  };
};
