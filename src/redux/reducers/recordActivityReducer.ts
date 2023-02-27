const initialState = {
    timer: 0,
    isPaused: true,
    isActive: false,
    distance: 0,
    speed: 0,
    activity: {
        startedAt: 0,
        activityId: '',
        activityName: '',
        finishedAt: 0,
        duration: 0,
        distance: 0,
        speed: 0,
        immediatePoints: [],
        activityTypeId: '',
        images: [],
        isPublic: true,
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

interface updateActivityStartedAt {
    type: 'UPDATE_ACTIVITY_STARTED_AT',
    payload: number
}

interface updateActivityFinishedAt {
    type: 'UPDATE_ACTIVITY_FINISHED_AT',
    payload: number
}

interface updateActivitySpeed {
    type: 'UPDATE_ACTIVTY_SPEED',
    payload: number
}

interface updateActvityImage {
    type: 'UPDATE_ACTIVITY_IMAGE',
    payload: any
}

interface updateActivtyType {
    type: 'UPDATE_ACTIVTY_TYPE',
    payload: boolean
}

type action =  updateActivityValue 
              | resetActivityValue 
              | updateRecordActivityTimer 
              | updateRecordDistanceMeter 
              | updatRecordSpeedMeter 
              | updateImmediatePoints 
              | updateActivityId
              | updateActivityStartedAt
              | updateActivitySpeed
              | updateActivityFinishedAt
              | updateActvityImage
              | updateActivtyType;

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

        case 'UPDATE_ACTIVITY_STARTED_AT': {
            return {
                ...state,
                activity: {
                    ...state.activity,
                    startedAt: action.payload
                }
            }
        }

        case 'UPDATE_ACTIVITY_FINISHED_AT': {
            return {
                ...state,
                activity: {
                    ...state.activity,
                    finishedAt: action.payload
                }
            }
        }

        case 'UPDATE_ACTIVTY_SPEED' : {
            return {
                ...state,
                activity: {
                    ...state.activity,
                    speed: action.payload
                }
            }
        }

        case 'UPDATE_ACTIVITY_IMAGE': {
            return {
                ...state,
                activity: {
                    ...state.activity,
                    images: [...state.activity.images, action.payload],
                }
            }
        }

        case 'UPDATE_ACTIVTY_TYPE': {
            return {
                ...state,
                activity: {
                    ...state.activity,
                    isPublic: action.payload
                }
            }
        }
  
        default:
            return state
    }
};

export default RecordActivityReducer;


export const updateRecordActivityValue = (data: data): updateActivityValue => {
    return {
        type: 'UPDATE_ACTIVITY_VALUE',
        payload: data,
    }
};

export const resetRecordActivityValue = (): resetActivityValue => {
    return {
        type: 'RESET_ACTIVITY_VALUE'
    }
};

export const updateRecordActivityTimer = (): updateRecordActivityTimer => {
    return {
        type: 'UPDATE_RECORD_TIMER'
    }
};

export const updateDistanceMeter = (distance: number): updateRecordDistanceMeter => {
    return {
        type: 'UPDATE_RECORD_DISTANCE_METER',
        payload: distance
    }
}

export const updateSpeedMeter = (speed: number): updatRecordSpeedMeter => {
    return {
        type: 'UPDATE_SPEED_METER',
        payload: speed,
    }
}

export const setImmediatePoints = (data: any): updateImmediatePoints => {
    return {
        type: 'UPDATE_IMMEDIATE_POINTS',
        payload: data,
    }
}

export const updateActivityId = (id: string): updateActivityId => {
    return {
        type: 'UPDATE_ACTIVITY_ID',
        payload: id,
    }
}

export const updateActivityStartedAt = (milliSeconds: number): updateActivityStartedAt => {
    return {
        type: 'UPDATE_ACTIVITY_STARTED_AT',
        payload: milliSeconds
    }
}

export const updateActivityFinishedAt = (milliSeconds: number): updateActivityFinishedAt => {
    return {
        type: 'UPDATE_ACTIVITY_FINISHED_AT',
        payload: milliSeconds
    }
}

export const updateActivitySpeed = (speed: number) : updateActivitySpeed => {
    return {
        type: 'UPDATE_ACTIVTY_SPEED',
        payload: speed,
    }
}

export const updateActvityImage = (data: any): updateActvityImage => {
    return {
        type: 'UPDATE_ACTIVITY_IMAGE',
        payload: data,
    }
}

export const updateActivityType = (type: boolean): updateActivtyType => {
    return {
        type: 'UPDATE_ACTIVTY_TYPE',
        payload: type
    }
}