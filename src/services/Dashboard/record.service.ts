import axios from 'axios';
import {URL} from '@env';
import {getUserDataFromLocalStorage} from '../../utlis/auth';

interface addActivity {
  activityTypeId: string;
  from: cord;
}

type cord = {lat: number; lng: number};

export const GetActivityTypeList = async () => {
  const url = `${URL}/oauth/`;
  return axios.get(url);
};

export const AddActivityService = async (data: addActivity) => {
  const url = `${URL}activity/add-activity`;
  const user = await getUserDataFromLocalStorage();
  console.log('user', user.accessToken);
  return axios.post(url, data, {
    headers: {
      'x-auth-token': user.accessToken,
    },
  });
};
