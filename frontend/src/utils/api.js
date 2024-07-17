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
    return res.data;
  } catch (error) {
    console.error('Error deleting user', error);
    throw new Error('Error deleting user');
  }
};

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dflb5okkq/image/upload';
const UPLOAD_PRESET = 'profile_images'

export const handleUpload = async (event) => {
  const file = event.target.files[0];

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading image', error);
    throw new Error('Error uploading image');
  }
};

export const handleUpdateProfilePicture = async (userId, profilePictureUrl) => {
  try {
    const res = await api().put(`/user/${userId}`, { profilePicture: profilePictureUrl });
    return res.data;
  } catch (error) {
    console.error('Error updating profile picture', error);
    throw new Error('Error updating profile picture');
  }
};

export const fetchUserData = async (userId) => {
  try {
    const res = await api().get(`/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching user data', error);
    throw new Error('Error fetching user data');
  }
};
