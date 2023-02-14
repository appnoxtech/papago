import { cords } from "../../interfaces/Dashboard/record.interface";

const initialState = {
    crrLocation: null,
    initialCords: null,
    destination: null,
    wayPoints: [],
}

interface initailCords {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

interface updateCurrentLocation {
    type: 'UPDATE_CURRENT_LOCATION';
    payload: initailCords;
};

interface updateInitialCords {
    type: 'UPDATE_INITIAL_CORDS';
    payload: cords;
}

interface updateDestinationCords {
    type: 'UPDATE_DESTINATION_CORDS';
    payload: cords;
}

interface updateWayPoints {
    type: 'UPDATE_WAY_POINTS';
    payload: Array<cords>
}

interface resetMapData {
    type: 'RESET_MAP_DATA',
}

type action = updateCurrentLocation 
              | updateInitialCords
              | updateDestinationCords
              | updateWayPoints
              | resetMapData;


const MapReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case 'UPDATE_INITIAL_CORDS':{
            return {
                ...state,
                initialCords: {...action.payload}
            }
        }

        case 'UPDATE_CURRENT_LOCATION': {
            return {
                ...state,
                crrLocation: {...action.payload}
            }
        }

        case 'UPDATE_DESTINATION_CORDS': {
            return {
                ...state,
                destination: {...action.payload}
            }
        }

        case 'UPDATE_WAY_POINTS': {
            return {
                ...state,
                wayPoints: [...action.payload]
            }
        }

        case 'RESET_MAP_DATA' : {
            return {
                ...initialState,
            }
        }
    
        default:
            return state;
    }
}

export default MapReducer;

export const updateInitialCords = (data: cords) => {
    return {
        type: 'UPDATE_INITIAL_CORDS',
        payload: data,
    }
};

export const updateCurrentLocation = (data: initailCords) => {
    return {
        type: 'UPDATE_CURRENT_LOCATION',
        payload: data,
    }
};

export const updateDestinationCords = (data: cords) => {
    return {
        type: 'UPDATE_DESTINATION_CORDS',
        payload: data,
    }
};

export const updateWayPoints = (data: Array<cords>) => {
    return {
        type: 'UPDATE_WAY_POINTS',
        payload: data,
    }
}

export const resetMapData = () => {
    return {
        type: 'RESET_MAP_DATA',
    }
}