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
