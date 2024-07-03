import axios from 'axios';
import { getUserToken, removeUserSession } from './localStorage';

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

export const handleDeleteForm = async (formId) => {
  const res = await api().delete(`/form/${formId}`);
  return res.data;
};

export const handleDeleteUser = async (userId) => {
  try {
    const res = await api().delete(`/user/${userId}`);
    removeUserSession();
    return res.data;
  } catch (error) {
    console.error('Error deleting user', error);
    throw new Error('Error deleting user');
  }
};