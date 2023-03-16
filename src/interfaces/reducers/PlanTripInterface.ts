import { data } from "../Dashboard/record.interface";

export interface PlanTripInterface {
    selectedActivity: null | data,
    startingCords: planTripCords,
    endingCords: planTripCords,
    eventTabVisibility: 'flex' | 'none',
    stops: Array<planTripCords> | []
}

export interface planTripCords {
    cords: {latitude: number | undefined, longitude: number | undefined} | null;
    name: string
}

export interface addEventApiCords {
    longitude: number | undefined,
    latitude: number | undefined,
    name: string
}

export interface addEventParams {
    from: addEventApiCords,
    to: addEventApiCords,
    immediatePoints: Array<addEventApiCords>
    activityTypeId: string,
    distance: number,
}