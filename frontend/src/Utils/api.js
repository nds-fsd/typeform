import axios from 'axios';
import { getUserToken } from './localStorage';

export const api = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const fetchForm = async (formId) => {
  try {
    const res = await api().get(`/form/${formId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching form', error);
    throw new Error('Error fetching form');
  }
};

export const handleDeleteForm = async (formId) => {
  const res = await api().delete(`/form/${formId}`);
  return res.data;
};
