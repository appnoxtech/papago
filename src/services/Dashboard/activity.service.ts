import axios from 'axios';
// import {URL} from '@env';

export const GetAllActivityService = async () => {
  const URL = 'http://192.168.68.105:5000/api/';
  const url = `${URL}activity/get-all-activitytype`;
  return axios.get(url);
};
