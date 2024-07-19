import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import SmallButton from '../Buttons/SmallButton';

const ConfirmationModal = ({ open, onClose, title, description, onConfirm, textOnConfirm, textOnClose }) => {
  return (
    <>
      <Dialog open={open} onClose={onClose} className='relative z-50'>
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <DialogPanel className='max-w-lg space-y-4 border bg-white/80 p-8 rounded-2xl'>
            <DialogTitle className='font-bold'>{title}</DialogTitle>
            <Description>{description}</Description>
            <div className='flex gap-4 justify-between pt-10'>
              <SmallButton onClick={onClose} text={textOnClose} />
              <SmallButton id='confirm' onClick={onConfirm} text={textOnConfirm} />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ConfirmationModal;
