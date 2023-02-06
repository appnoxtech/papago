import axios from 'axios';
import {OTPData, generateOTP} from '../../interfaces/auth/authInterface';
import {URL} from '@env';

export const confirmOTPService = async (data: OTPData) => {
  const url = `${URL}access/oauth/generate-verify-otp`;
  return axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const generateOTPService = async (data: generateOTP) => {
  console.log('URL', URL);
  const url = `${URL}access/oauth/generate-verify-otp`;
  console.log('url', url);
  console.log('data', data);

  return axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
