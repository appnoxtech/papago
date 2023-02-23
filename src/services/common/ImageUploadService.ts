import {URL} from '@env';
import axios from 'axios';
import { getUserDataFromLocalStorage } from '../../utlis/auth';

export const ImageUploadService = async (data: any) => {
   const url = `${URL}image/image-upload`;
   const user = await getUserDataFromLocalStorage();
   console.log('url', url);
   console.log('data***', data);
   
   
   return axios.post(url, data, {
     headers: {
       'x-auth-token': user.accessToken,
       'Content-Type': 'multipart/form-data',
     },
   });
}