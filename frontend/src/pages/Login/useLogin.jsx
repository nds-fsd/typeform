// src/components/Login/useLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import { setUserSession } from '../../utils/localStorage';

const useLogin = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const response = await api().post('/login', data);
      setUserSession(response.data);
      navigate('/workspace');
    } catch (error) {
      setError(error.response.data);
    }
  };

  return { login, error };
};

export default useLogin;
