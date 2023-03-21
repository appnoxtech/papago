import { user } from "../../interfaces/auth/authInterface";
import { getAllActivity } from "../../interfaces/Dashboard/record.interface";

interface user {
  isLogin: boolean,
  activityList: Array<getAllActivity> | [];
  userDetails: any,
  localActivityList: Array<getAllActivity> | [];
}

interface item {_id: string, isLiked: boolean, likeCount: number, messageCount: number};

const initialState:user  = {
  isLogin: true,
  activityList: [],
  userDetails: {},
  localActivityList: [],
};

interface UpdateAction {
  type: 'UPDATE_USER_DATA';
  payload: boolean;
}

interface updateActivityList {
  type: 'UPDATE_USER_ACTIVITY_LIST',
  payload: any
}

interface updateActivityListItem {
  type: 'UPDATE_ACTIVITY_LIST_ITEM',
  payload: item
}

interface updateUserDetails {
  type: 'UPDATE_USER_DETAILS',
  payload: user
}

interface updateLocalActivityList {
  type: 'UPDATE_LOCAL_ACTIVITY_LIST',
  payload: any
}

type action = updateActivityList | UpdateAction | updateUserDetails | updateLocalActivityList | updateActivityListItem;

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

    case 'UPDATE_LOCAL_ACTIVITY_LIST': {    
      return {
        ...state,
        localActivityList: state.localActivityList ? [...state.localActivityList, action.payload] : [action.payload]
      }
    }

    case 'UPDATE_ACTIVITY_LIST_ITEM': {
      const list = [...state.activityList];
      const index = list.findIndex((item) => item._id === action.payload._id)
      list[index] = {...list[index], ...action.payload};
       return {
         ...state,
         activityList: [...list],
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

export const updateLocalActivityList = (data: any) => {
  return {
    type: 'UPDATE_LOCAL_ACTIVITY_LIST',
    payload: data
  }
}

export const updateActivityListItem = (data: item): updateActivityListItem => {
  return {
    type: 'UPDATE_ACTIVITY_LIST_ITEM',
    payload: data,
  }
}