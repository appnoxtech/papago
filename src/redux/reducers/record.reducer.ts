const initialState = {
  isStart: false,
  isPaused: false,
  isEnd: false,
  keepScreenAwake: false,
  autoPause: false,
};

interface actionPayload {
  key: 'isStart' | 'isPaused' | 'isEnd';
  value: boolean;
}

interface updateRecordStatus {
  type: 'UPDATE_RECORD_STATUS';
  payload: actionPayload;
}

interface resetRecordStatus {
  type: 'RESET_RECORD_STATUS';
}

interface toggleKeepScreenAwake {
  type: 'TOGGLE_KEEP_SCREEN_AWAKE_SETTING',
  payload: boolean
}

interface toggleAutoPauseSetting {
  type: 'TOGGLE_AUTO_PAUSE_SETTING',
  payload: boolean
}

type action = updateRecordStatus | resetRecordStatus | toggleKeepScreenAwake | toggleAutoPauseSetting;

export const RecordStatusReducer = (state = initialState, action: action) => {
  switch (action.type) {
    case 'UPDATE_RECORD_STATUS': {
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    }

    case 'RESET_RECORD_STATUS': {
      return {
        ...initialState,
      };
    }

    case 'TOGGLE_AUTO_PAUSE_SETTING': {
      return {
        ...state, 
        autoPause: action.payload
      }
    }

    case 'TOGGLE_KEEP_SCREEN_AWAKE_SETTING' : {
      return {
        ...state, 
        keepScreenAwake: action.payload
      }
    }

    default:
      return state;
  }
};

export const updateRecordStatus = (data: actionPayload) => {
  return {
    type: 'UPDATE_RECORD_STATUS',
    payload: data,
  };
};

export const resetRecordStatus = () => {
  return {
    type: 'RESET_RECORD_STATUS',
  };
};

export const toggleAutoPauseSetting = (state: boolean): toggleAutoPauseSetting => {
  return {
    type: 'TOGGLE_AUTO_PAUSE_SETTING',
    payload: state
  }
}

export const toggleKeepScreenAwake = (state: boolean): toggleKeepScreenAwake => {
  return {
    type: 'TOGGLE_KEEP_SCREEN_AWAKE_SETTING',
    payload: state
  }
}
