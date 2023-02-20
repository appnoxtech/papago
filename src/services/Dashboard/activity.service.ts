import axios from 'axios';
import {URL} from '@env';

export const GetAllActivityService = async () => {
  console.log('URL', URL);
  const url = `${URL}activity/get-all-activitytype`;
  return axios.get(url);
};
