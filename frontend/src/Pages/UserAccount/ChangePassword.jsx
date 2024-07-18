import React, { useState } from 'react';
import SmallButton from '../../components/Buttons/SmallButton';
import { useUserProvider } from '../../context/UserContext.jsx';
import ModalChangePassword from './ModalChangePassword.jsx';
import { api } from '../../utils/api.js';

const ChangePassword = () => {
  const { userId } = useUserProvider();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPassword('');
    setConfirmPassword('');
    setMessage('');
  };

  const handleConfirm = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    console.log(userId);
    try {
      const res = await api().post(`/user/${userId}/change-password`, {
        newPassword: password,
        confirmNewPassword: confirmPassword,
      });
      setMessage('Password changed successfully');
      handleClose();
    } catch (error) {
      console.error('Error changing password', error);
      setMessage('Failed to change password');
    }
  };

  return (
    <div>
      <SmallButton onClick={handleClick} text='Change Password' />
      <ModalChangePassword
        open={open}
        onClose={handleClose}
        title='Confirm Password Change'
        description='Please enter your new password and confirm it.'
        onConfirm={handleConfirm}
        textOnConfirm='Confirm'
        textOnClose='Cancel'
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        message={message}
      />
    </div>
  );
};

export default ChangePassword;
