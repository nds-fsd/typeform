import React from 'react';

const FormSubmitModal = ({ showModal }) => {
  return (
    <>
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='relative w-full max-w-md bg-white rounded-lg shadow-lg'>
            <div className='p-4'>
              <h3 className='text-xl font-semibold'>Thank you!</h3>
              <p className='text-gray-700'>
                Your responses have been submitted successfully. Thank you for your participation!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormSubmitModal;
