import axios from 'axios';
import {URL} from '@env';
import {
  loginData,
  resetPassword,
  signupData,
  ssoData,
} from '../../interfaces/auth/authInterface';

export const SsoService = async (data: ssoData) => {
  console.log('URL', URL);
  
  console.log('ssoData', data);
  const url = `${URL}access/oauth/single-sign-on`;
  return axios.post(url, data);
};

export const LoginServices = async (data: loginData) => {
  console.log('URL', URL);
  const url = `${URL}access/oauth/log-in`;
  return axios.post(url, data, {
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
