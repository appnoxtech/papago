const initialState = {
  isLogin: true,
  activityList: [],
};

interface UpdateAction {
  type: 'UPDATE_USER_DATA';
  payload: boolean;
}

interface updateActivityList {
  type: 'UPDATE_USER_ACTIVITY_LIST',
  payload: any
}

type action = updateActivityList | UpdateAction;

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

    default:
      return state;
  }
};

export default UserReducer;

export const updateUserData = (isLogin: boolean) => {
  return {
    type: 'UPDATE_USER_DATA',
    payload: isLogin,
  };
};

export const updateUserActivityList = (data: any) => {
  return {
    type: 'UPDATE_USER_ACTIVITY_LIST',
    payload: data
  }
}