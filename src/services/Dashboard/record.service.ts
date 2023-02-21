import axios from 'axios';
import {URL} from '@env';
import {getUserDataFromLocalStorage} from '../../utlis/auth';
import { addActivity, cords, updateActivity } from '../../interfaces/Dashboard/record.interface';



type cord = {lat: number; lng: number};

export const GetActivityTypeList = async () => {
  const url = `${URL}/oauth/`;
  return axios.get(url);
};

export const AddActivityService = async (data: addActivity) => {
  const url = `${URL}activity/add-activity`;
  const user = await getUserDataFromLocalStorage();
  
  console.log('tokkken', user.accessToken);
  console.log('data', data);
  console.log('url', url);
  
  return axios.post(url, data, {
    headers: {
      'x-auth-token': user.accessToken,
    },
  });
};

export const GetActivityByIdService = async(activityId: string) => {
  const url = `${URL}activity/get-one-activity/${activityId}`;
  const user = await getUserDataFromLocalStorage();
  
  return axios.get(url, {
    headers: {
      'x-auth-token': user.accessToken,
    },
  });
}

export const UpdateActivityService = async (data: updateActivity) => {
  
  const url = `${URL}activity/update-activity`;
  const user = await getUserDataFromLocalStorage();
  return axios.post(url, data, {
    headers: {
      'x-auth-token': user.accessToken,
    },
  });
}

export const GetActivityListService = async () => {
  const url = `${URL}activity/get-all-activity`;
  const user = await getUserDataFromLocalStorage();
  return axios.get(url, {
    headers: {
      'x-auth-token': user.accessToken,
    },
  });
}