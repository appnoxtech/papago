const initialState = {
  isLogin: true,
};

interface UpdateAction {
  type: 'UPDATE_USER_DATA';
  payload: boolean;
}

const UserReducer = (state = initialState, action: UpdateAction) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA': {
      return {
        ...state,
        isLogin: action.payload,
      };
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
