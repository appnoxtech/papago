import axios from 'axios';

export const GetDataListService = async () => {
    const URL = 'https://jsonplaceholder.typicode.com/photos/';
    return axios.get(URL);
}