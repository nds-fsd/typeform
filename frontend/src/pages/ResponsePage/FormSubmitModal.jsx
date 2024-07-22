import React from 'react';

const FormSubmitModal = ({ showModal }) => {
  return (
    <>
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='flex flex-col relative w-full max-w-md bg-white rounded-3xl p-8 shadow-lg gap-8'>
            <h3 className='text-2xl font-semibold'>Thank you!</h3>
            <p className='text-gray-700 text-lg'>
              Your responses have been submitted successfully. Thank you for your participation!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FormSubmitModal;
