const initialState = {
    email: '',
    password: '',
    userName: '',
    name: ''
}

interface UpdateAuthDetails {
    type: 'UPDATE_AUTH_DETAILS',
    payload: data
}

interface ResetAuthDetails {
    type: 'RESET_AUTH_DETAILS'
}

type data = {
    key: 'email' | 'password' | 'userName' | 'name',
    value: string
}

type action = UpdateAuthDetails | ResetAuthDetails;

const AuthReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case 'UPDATE_AUTH_DETAILS': {
            return {
                ...state,
                [action.payload.key] : action.payload.value
            }
        }

        case 'RESET_AUTH_DETAILS': {
            return {
                ...initialState
            }
        }
    
        default:
            return state;
    }
}

export default AuthReducer;

export const UpdateAuthDetails = (data: data): UpdateAuthDetails => {
  return {
    type: 'UPDATE_AUTH_DETAILS',
    payload: data
  }
}

export const ResetAuthDetails = (): ResetAuthDetails => {
    return {
        type: 'RESET_AUTH_DETAILS'
    }
}
