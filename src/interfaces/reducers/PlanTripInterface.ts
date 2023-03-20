import { data } from "../Dashboard/record.interface";

export interface PlanTripInterface {
    selectedActivity: null | string,
    startingCords: planTripCords,
    endingCords: planTripCords,
    eventTabVisibility: 'flex' | 'none',
    stops: Array<planTripCords> | [],
    distance: number,
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
    _id?: string,
    eventTitle?: string,
    eventDescription?: string,
    from: addEventApiCords,
    to: addEventApiCords,
    immediatePoints: Array<addEventApiCords>
    activityTypeId: string,
    distance: number,
}