import axios from 'axios';
import {URL} from '@env';

export const GetAllActivityService = async () => {
  const url = `${URL}activity/get-all-activitytype`;
  return axios.get(url);
};
