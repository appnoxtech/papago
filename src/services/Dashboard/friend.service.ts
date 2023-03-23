import axios from 'axios';
import {URL} from '@env';
import { getUserDataFromLocalStorage } from '../../utlis/auth';

export const GetFriendListService = async() => {
    const url = `${URL}friend/get-user-list`;
    const user = await getUserDataFromLocalStorage();
    return axios.get(url, {
      headers: {
        'x-auth-token': user.accessToken,
      },
    });
  }