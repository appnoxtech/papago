import { addEventParams } from "../../interfaces/reducers/PlanTripInterface";

const initialState = {
    eventList: [],
    selectedEvent: null
}

interface UpdateEvents {
    type: 'UPDATE_EVENT_LIST',
    payload: Array<addEventParams>,
}

interface UpdateSelectedEvent {
    type: 'UPDATE_SELECTED_EVENT',
    payload: addEventParams
}

type action = UpdateEvents | UpdateSelectedEvent;

const EventsReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case 'UPDATE_EVENT_LIST': {
            return {
                ...state,
                eventList: [...action.payload]
            }
        }

        case 'UPDATE_SELECTED_EVENT': {
            return {
                ...state,
                selectedEvent: {...action.payload}
            }
        }
    
        default: {
           return state;
        }
    }
}

export default EventsReducer;

export const UpdateEventList = (EventList: Array<addEventParams>): UpdateEvents => {
     return {
        type: 'UPDATE_EVENT_LIST',
        payload: EventList,
     }
}

export const UpdateSelectedEvent = (selectedEvent: addEventParams): UpdateSelectedEvent => {
   return {
     type: 'UPDATE_SELECTED_EVENT',
     payload: selectedEvent
   }
}

