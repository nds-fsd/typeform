import React, { useState } from 'react';
import CopyClipboard from './CopyClipboard';

const ShareButton = ({ formId, publishBtnClass }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type='button'
        onClick={() => setShowModal(true)}
        className={publishBtnClass || 'font-semibold block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left'}
      >
        Publish
      </button>
      {showModal && (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
            <div className='relative w-auto mx-auto my-6 max-w-2xl'>
              <div className='relative flex flex-col w-full bg-white/50 rounded-lg shadow-lg outline-none focus:outline-none'>
                <div className='flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t'>
                  <h3 className='text-xl font-semibold'>Share form</h3>
                  <button
                    className='p-1 ml-auto text-black bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='block w-6 h-6 text-2xl bg-transparent text-black outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                <div className='relative flex-auto p-6'>
                  <CopyClipboard formId={formId} />
                </div>
              </div>
            </div>
          </div>
          <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
        </>
      )}
    </>
  );
};

export default ShareButton;
