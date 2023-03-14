const initiaState = {
   selectedActivity: null,
   eventTabVisibility: 'flex',
}

interface ChangeSelectedActivity {
   type: 'UPDATE_SELECTED_ACTIVITY',
   payload: string
}

interface ToggleEventTabVisibility {
    type: 'UPDATE_TAB_BAR_VISIBILITY',
    payload: 'flex' | 'none',
}

type action = ChangeSelectedActivity | ToggleEventTabVisibility;

const PlanTripReducer = (state = initiaState, action: action) => {
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

