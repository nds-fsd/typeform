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
    console.log(userId)
    const res = await api().delete(`/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting user', error);
    throw new Error('Error deleting user');
  }
};

const CLOUDINARY_URL = 'cloudinary://554346411718287:FkldIiBIF_uS-C-woi9_kZBEFww@dflb5okkq';

export const handleUpload = async (image) => {
  const formData = new FormData();
  formData.append('file', image);

  const response = await axios.post(CLOUDINARY_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.secure_url;
};
