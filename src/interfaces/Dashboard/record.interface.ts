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

export interface addActivity {
  finishedAt: number,
  startedAt: number,
  activityName: string,
  distance: number,
  duration: number,
  activityTypeId: string,
  immediatePoints: Array<cords>,
}