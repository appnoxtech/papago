import axios from 'axios';
import {getUserDataFromLocalStorage} from './auth';
import {URL} from "@env";

const API = axios.create({
  baseURL: URL,
  timeout: 60000,
});

API.interceptors.request.use(
  async function (request) {
    // console.log(request.url);
    if (request.url !== '/oauth') {
      const {accessToken} = await getUserDataFromLocalStorage();
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

// API.interceptors.response.use(
//   response => {
//     if ([401, 403].includes(response.status)) {
//       if (window.location.pathname !== '/login') {
//         window.location.replace('/login');
//       }
//       // antMessage.error('Please Login! You must be logged in to view this content!')
//     }
//     return response;
//   },
//   error => {
//     // if (error?.message === "Request failed with status code 404") {
//     //     window.location.replace('/login')
//     // }
//     if ([401, 403].includes(error?.response?.status)) {
//       if (window.location.pathname !== '/login') {
//         window.location.replace('/login');
//       }
//       // antMessage.error('Please Login! You must be logged in to view this content!')
//     }
//     return Promise.reject(error);
//   },
// );

export default API;
