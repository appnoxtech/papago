const initialState = {
  isStart: false,
  isPaused: false,
  isEnd: false,
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

type action = updateRecordStatus | resetRecordStatus;

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
