import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyClipboard = ({ formId }) => {
  const [textToCopy, setTextToCopy] = useState('');

  useEffect(() => {
    if (formId) {
      setTextToCopy(`${location.host}/responseform/${formId}`);
    }
  }, [formId]);

  return (
    <div className='flex flex-row border-2 z-50 items-center text-xs rounded-md w-full'>
      <p className='p-2 overflow-hidden overflow-ellipsis whitespace-nowrap flex-grow'>{textToCopy}</p>
      <CopyToClipboard text={textToCopy}>
        <button className='p-2 border-l-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-700'>Copy</button>
      </CopyToClipboard>
    </div>
  );
};

export default CopyClipboard;
