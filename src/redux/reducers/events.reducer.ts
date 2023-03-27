import { addEventParams } from "../../interfaces/reducers/PlanTripInterface";

const initialState = {
    eventList: [],
    invitedEventList: [],
    pendingInvitationEventList: [],
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

interface UpdateInvitedEventList {
    type: 'UPDATED_INVITED_EVENT_LIST',
    payload: Array<addEventParams>
}

interface UpdatePendingInvitationEventList {
    type: 'UPDATE_PENDING_INVITATION_EVENT_LIST',
    payload: Array<addEventParams>
}

type action = UpdateEvents | UpdateSelectedEvent | UpdateInvitedEventList | UpdatePendingInvitationEventList;

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

        case 'UPDATED_INVITED_EVENT_LIST': {
            return {
                ...state,
                invitedEventList: [...action.payload]
            }
        }

        case 'UPDATE_PENDING_INVITATION_EVENT_LIST': {
            return {
                ...state,
                pendingInvitationEventList: [...action.payload]
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
};

export const UpdateSelectedEvent = (selectedEvent: addEventParams): UpdateSelectedEvent => {
   return {
     type: 'UPDATE_SELECTED_EVENT',
     payload: selectedEvent
   }
};

export const UpdateInvitedEventList = (list: Array<addEventParams>): UpdateInvitedEventList => {
    return {
        type: 'UPDATED_INVITED_EVENT_LIST',
        payload: list
    }
};

export const UpdatePendingInvitationEventList = (list: Array<addEventParams>) : UpdatePendingInvitationEventList => {
    return {
        type: 'UPDATE_PENDING_INVITATION_EVENT_LIST',
        payload: list
    }
}

