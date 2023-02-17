import { user } from "../../interfaces/auth/authInterface";

const initialState = {
  isLogin: true,
  activityList: [],
  userDetails: {}
};

interface UpdateAction {
  type: 'UPDATE_USER_DATA';
  payload: boolean;
}

interface updateActivityList {
  type: 'UPDATE_USER_ACTIVITY_LIST',
  payload: any
}

interface updateUserDetails {
  type: 'UPDATE_USER_DETAILS',
  payload: user
}

type action = updateActivityList | UpdateAction | updateUserDetails;

const UserReducer = (state = initialState, action: action) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA': {
      return {
        ...state,
        isLogin: action.payload,
      };
    }

    case 'UPDATE_USER_ACTIVITY_LIST': {
      return {
        ...state,
        activityList: [...action.payload]
      }
    }

    case 'UPDATE_USER_DETAILS': {
      return {
        ...state,
        userDetails: {...action.payload}
      }
    }

    default:
      return state;
  }
};

export default UserReducer;

export const updateUserData = (isLogin: boolean): UpdateAction => {
  return {
    type: 'UPDATE_USER_DATA',
    payload: isLogin,
  };
};

export const updateUserActivityList = (data: any): updateActivityList => {
  return {
    type: 'UPDATE_USER_ACTIVITY_LIST',
    payload: data
  }
}

export const updateUserDetails = (data: user): updateUserDetails => {
   return {
     type: 'UPDATE_USER_DETAILS',
     payload: data,
   }
}