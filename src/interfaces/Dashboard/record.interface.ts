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
  speed: number,
  images: any,
}

export interface updateActivity {
  activityId?: string,
  activityName?: string,
  activityTypeId?: string,
}

export interface likeActivity {
  activityId: string;
  like?: 0 | 1;
  message?: string,
}

export interface actvityCommentDetails {
  _id: string,
  message: string,
  name: string,
  userName: string,
}

export interface actvityLikeDetails {
  _id: string,
  like: number,
  name: string,
  userName: string,
}

export interface activityDetails {
  _id: string;
  activityData: data;
  activityName: string;
  distance: number;
  duration: number;
  finishedAt: number;
  immediatePoints: Array<cords>;
  startedAt: number;
  userId: string;
  likeCount: number;
  isLiked: boolean;
  images?: any,
}

export interface image {
  name: string,
  type: string,
  uri: string,
}