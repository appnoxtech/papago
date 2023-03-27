import axios from 'axios';
import {URL} from '@env';
import { getUserDataFromLocalStorage } from '../../utlis/auth';
import { addEventParams } from '../../interfaces/reducers/PlanTripInterface';

export const AddEventService = async (data: addEventParams) => {
    const url = `${URL}event/create-trip`;
    const user = await getUserDataFromLocalStorage();
    console.log('url', url);
    return axios.post(url, data, {
      headers: {
        'x-auth-token': user.accessToken,
      },
    });
};

export const GetEventListService = async() => {
  const url = `${URL}event/get-all-trip`;
  const user = await getUserDataFromLocalStorage();
  return axios.get(url, {
    headers: {
      'x-auth-token': user.accessToken,
    },
  });
}

export const GetInvitedEventListService = async() => {
  const url = `${URL}event/get-all-trip-participated`;
  const user = await getUserDataFromLocalStorage();
  return axios.get(url, {
    headers: {
      'x-auth-token': user.accessToken,
    },
  });
}

export const UpdateEventTripService = async(data: addEventParams) => {
  const url = `${URL}event/update-trip`;
  const user = await getUserDataFromLocalStorage();
  console.log('url', url);
  
  return axios.put(url, data, {
    headers: {
      'x-auth-token': user.accessToken,
    },
  });
}

export const DeleteEventTripByIDService = async(eventId: string) => {
  const url = `${URL}event/delete-trip/${eventId}`;
  const user = await getUserDataFromLocalStorage();
  return axios.delete(url, {
    headers: {
      'x-auth-token': user.accessToken,
    },
  });
}

export const SendEventTripInvitationService = async (data: any) => {
  const url = `${URL}event/send-invitation`;
  const user = await getUserDataFromLocalStorage();
  return axios.post(url, data, {
    headers: {
      'x-auth-token': user.accessToken,
    },
  });
}

export const AcceptEventTripInvitationService = async (data: any) => {
  const url = `${URL}event/accept-invitation`;
  const user = await getUserDataFromLocalStorage();
  console.log('url', url);
  console.log('data', data);
  
  return axios.post(url, data, {
    headers: {
      'x-auth-token': user.accessToken,
    },
  });
}