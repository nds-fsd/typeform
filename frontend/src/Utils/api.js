import axios from 'axios';
import { getUserToken } from './localStorage';

export const api = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};
