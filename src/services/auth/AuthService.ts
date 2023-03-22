import axios from 'axios';
import {URL} from '@env';
import {
  loginData,
  resetPassword,
  signupData,
  ssoData,
} from '../../interfaces/auth/authInterface';
import { Platform } from 'react-native';
import { GetFCMToken } from '../../utlis/PushNotification.helper';

export const SsoService = async (data: ssoData) => {
  console.log('URL', URL);
  const FCMToken = await GetFCMToken();
  
  const newData = Platform.OS === 'android' ? 
  {...data, notificationToken: FCMToken} : data;

  console.log('newData', newData);
  const url = `${URL}access/oauth/single-sign-on`;
  return axios.post(url, newData);
};

export const LoginServices = async (data: loginData) => {
  const url = `${URL}access/oauth/log-in`;
  const FCMToken = await GetFCMToken();

  const newData = Platform.OS === 'android' ? 
  {...data, notificationToken: FCMToken} : data;
  
  console.log('NewData', newData);
  
  return axios.post(url, newData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const SignUpService = async (data: signupData) => {
  console.log('Data', data);
  
  const url = `${URL}access/oauth/sign-up`;
  console.log('url', url);
  
  return axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const ResetPasswordServices = async (data: resetPassword) => {
  const url = `${URL}access/oauth/forgot-password`;
  return axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
