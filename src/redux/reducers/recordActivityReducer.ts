const initialState = {
    timer: 0,
    isPaused: true,
    isActive: false,
    distance: 0,
    speed: 0,
    activity: {
        activityId: '',
        activityName: '',
        finishedAt: 0,
        duration: 0,
        distance: 0,
        immediatePoints: [],
        activityTypeId: ''
    }
}

type data = {
    key: 'timer' | 'isPaused' | 'isActive' | 'distance' | 'speed' | 'activity',
    value: number | boolean | any
}

interface updateActivityValue {
    type: 'UPDATE_ACTIVITY_VALUE',
    payload: data
}

interface resetActivityValue {
    type: 'RESET_ACTIVITY_VALUE'
}

interface updateRecordActivityTimer {
    type: 'UPDATE_RECORD_TIMER',
}

interface updateRecordDistanceMeter {
    type: 'UPDATE_RECORD_DISTANCE_METER',
    payload: number
}

interface updatRecordSpeedMeter {
    type: 'UPDATE_SPEED_METER',
    payload: number
}

interface updateImmediatePoints {
        type: 'UPDATE_IMMEDIATE_POINTS',
        payload: any,
}

interface updateActivityId {
    type: 'UPDATE_ACTIVITY_ID',
    payload: string
}

type action = updateActivityValue | resetActivityValue | updateRecordActivityTimer | updateRecordDistanceMeter | updatRecordSpeedMeter | updateImmediatePoints | updateActivityId;

const RecordActivityReducer = (state = initialState , action: action) => {
    switch (action.type) {
        case 'UPDATE_ACTIVITY_VALUE': {
           return {
            ...state,
            [action.payload.key] : action.payload.value
           };
        }

        case 'RESET_ACTIVITY_VALUE': {
            return {
                ...initialState,
            };
        }

        case 'UPDATE_RECORD_TIMER': {
            return {
                ...state,
                timer: state.timer + 1000,
            }
        }

        case 'UPDATE_RECORD_DISTANCE_METER': {
            console.log('distance ==>', action.payload);
            return {
                ...state,
                distance: action.payload
            }
        }

        case 'UPDATE_SPEED_METER': {
            return {
                ...state,
                speed: action.payload,
            }
        }

        case 'UPDATE_IMMEDIATE_POINTS': {
            return {
                ...state,
                activity: {
                    ...state.activity,
                    immediatePoints: [...action.payload]
                }
            }
        }

        case 'UPDATE_ACTIVITY_ID': {
            return {
                ...state,
                activity: {
                    ...state.activity,
                    activityId: action.payload,
                }
            }
        }
  
        default:
            return state
    }
};

export default RecordActivityReducer;


export const updateRecordActivityValue = (data: data) => {
    return {
        type: 'UPDATE_ACTIVITY_VALUE',
        payload: data,
    }
};

export const resetRecordActivityValue = () => {
    return {
        type: 'RESET_ACTIVITY_VALUE'
    }
};

export const updateRecordActivityTimer = () => {
    return {
        type: 'UPDATE_RECORD_TIMER'
    }
};

export const updateDistanceMeter = (distance: number) => {
    return {
        type: 'UPDATE_RECORD_DISTANCE_METER',
        payload: distance
    }
}

export const updateSpeedMeter = (speed: number) => {
    return {
        type: 'UPDATE_SPEED_METER',
        payload: speed,
    }
}

export const setImmediatePoints = (data: any) => {
    return {
        type: 'UPDATE_IMMEDIATE_POINTS',
        payload: data,
    }
}

export const updateActivityId = (id: string) => {
    return {
        type: 'UPDATE_ACTIVITY_ID',
        payload: id,
    }
}