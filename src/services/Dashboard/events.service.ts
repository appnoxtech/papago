import axios from 'axios';
import {URL} from '@env';
import { getUserDataFromLocalStorage } from '../../utlis/auth';
import { addEventParams } from '../../interfaces/reducers/PlanTripInterface';

export const AddEventService = async (data: addEventParams) => {
    const url = `${URL}event/create-trip`;
    const user = await getUserDataFromLocalStorage();
  
    return axios.post(url, data, {
      headers: {
        'x-auth-token': user.accessToken,
      },
    });
  };