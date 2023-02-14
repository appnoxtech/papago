export interface activity {
  title: string;
  data: Array<data>;
}

export interface data {
  _id: string;
  iconFamily: string;
  iconName: string;
  activityName: string;
  isPopular: boolean;
}

export interface cords {
  latitude: number, 
  longitude: number
}

export interface recordActivityData {
  activityId: string,
  activityName: string,
  duration: number,
  distance: number,
  immediatePoints: Array<cords>,
  activityTypeId: string
}
