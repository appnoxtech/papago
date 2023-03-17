import { addEventParams } from "../../interfaces/reducers/PlanTripInterface";

const initialState = {
    eventList: []
}

interface UpdateEvents {
    type: 'UPDATE_EVENT_LIST',
    payload: Array<addEventParams>,
}

type action = UpdateEvents;

const EventsReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case 'UPDATE_EVENT_LIST': {
            return {
                ...state,
                eventList: [...action.payload]
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

