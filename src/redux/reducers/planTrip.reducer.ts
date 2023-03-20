import { PlanTripInterface, planTripCords } from "../../interfaces/reducers/PlanTripInterface"

const initiaState: PlanTripInterface = {
   selectedActivity: null,
   startingCords: {cords: null, name: ''},
   endingCords: {cords: null, name: ''},
   eventTabVisibility: 'flex',
   stops: [],
   distance: 0,
}

interface ChangeSelectedActivity {
   type: 'UPDATE_SELECTED_ACTIVITY',
   payload: string
}

interface ToggleEventTabVisibility {
    type: 'UPDATE_TAB_BAR_VISIBILITY',
    payload: 'flex' | 'none',
}

interface UpdateStops {
    type: 'UPDATE_TRIP_STOP_POINTS',
    payload: addStops | removeStops | updateStop
}

interface UpdateCords {
    type: 'UPDATE_TRIPS_CORDS',
    payload: tripCords
}

interface ResetPlanTrip {
    type: 'RESET_PLAN_TRIP'
}

interface addStops {
    action: 'Add',
    data: planTripCords
}

interface removeStops {
    action: 'Remove',
    data: number
}

interface updateStop {
    action: 'Update',
    data: {
        index: number,
        value: planTripCords,
    }
}

interface tripCords {
    key: 'startingCords' | 'endingCords',
    planTripCords: planTripCords
}

interface updateDistance {
    type: 'UPDATE_DISTANCE',
    payload: number
}





type action = ChangeSelectedActivity | ToggleEventTabVisibility | UpdateStops | UpdateCords | ResetPlanTrip | updateDistance;

const PlanTripReducer = (state = initiaState, action: action): PlanTripInterface => {
   switch (action.type) {

    case 'UPDATE_SELECTED_ACTIVITY': {
        return {
            ...state,
            selectedActivity: action.payload,
        }
    }

    case 'UPDATE_TAB_BAR_VISIBILITY' : {
        return {
            ...state,
            eventTabVisibility: action.payload
        }
    }

    case 'UPDATE_TRIP_STOP_POINTS': {
        if(action.payload.action === 'Add') {
            return {
                ...state,
                stops: state?.stops ?  [...state.stops, action.payload.data] : [{...action.payload.data}]
            }
        }else if(action.payload.action === 'Remove') {
            const newStopsList = state.stops.filter((item, index) => index !== action.payload.data);
            return {
                ...state,
                stops: [...newStopsList],
            }
        } else {
            const list = state.stops;
            list[action.payload.data.index] = action.payload.data.value;
            return {
                ...state,
                stops: [...list]
            }
        }
    }

    case 'UPDATE_TRIPS_CORDS' : {
        return {
            ...state,
            [action.payload.key]: {...action.payload.planTripCords}
        }
    }

    case 'UPDATE_DISTANCE': {
        return {
            ...state,
            distance: action.payload,
        }
    }

    case 'RESET_PLAN_TRIP': {
        return {
            ...initiaState,
        }
    }

    default: {
        return state
    }

   }
}

export default PlanTripReducer;

export const ChangeSelectedActivity = (activitId: string): ChangeSelectedActivity => {
   return {
      type: 'UPDATE_SELECTED_ACTIVITY',
      payload: activitId
   }
}

export const ToggleEventTabVisibility = (display: 'flex' | 'none'): ToggleEventTabVisibility => {
    return {
       type: 'UPDATE_TAB_BAR_VISIBILITY',
       payload: display
    }
}

export const UpdateTripStopPoints = (activity: addStops | removeStops | updateStop): UpdateStops => {
    return {
        type: 'UPDATE_TRIP_STOP_POINTS',
        payload: activity
    }
}

export const UpdateTripsCords = (data: tripCords): UpdateCords => {
    return {
        type: 'UPDATE_TRIPS_CORDS',
        payload: data
    }
}

export const ResetPlanTrip = (): ResetPlanTrip => {
    return {
        type: 'RESET_PLAN_TRIP'
    }
}

export const UpdateTripDistance = (distance: number): updateDistance => {
    return {
        type: 'UPDATE_DISTANCE',
        payload: distance
    }
}

