import React from 'react';
import SmallButton from '../../components/Buttons/SmallButton';
import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import { useForm } from 'react-hook-form';

const ModalChangePassword = ({ open, onClose, title, description, onConfirm, textOnConfirm, textOnClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = (data) => {
    onConfirm(data);
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} className='relative z-50'>
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <DialogPanel className='max-w-lg space-y-4 border bg-white p-8 rounded-lg'>
          <DialogTitle className='font-bold'>{title}</DialogTitle>
          <Description>{description}</Description>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <input
              type='password'
              placeholder='New Password'
              {...register('password', { required: true, minLength: 6 })}
              className='border p-2 rounded-md'
            />
            {errors.password && errors.password.type === 'required' && (
              <p className='text-red-500'>This field is required</p>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <p className='text-red-500'>Password must be at least 6 characters</p>
            )}

            <input
              type='password'
              placeholder='Confirm New Password'
              {...register('confirmPassword', { required: true, minLength: 6 })}
              className='border p-2 rounded-md'
            />
            {errors.confirmPassword && errors.confirmPassword.type === 'required' && (
              <p className='text-red-500'>This field is required</p>
            )}
            {errors.confirmPassword && errors.confirmPassword.type === 'minLength' && (
              <p className='text-red-500'>Password must be at least 6 characters</p>
            )}

            <div className='flex justify-end mt-4'>
              <SmallButton onClick={onClose} text={textOnClose} className='mr-4' />
              <SmallButton type='submit' text={textOnConfirm} />
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ModalChangePassword;
