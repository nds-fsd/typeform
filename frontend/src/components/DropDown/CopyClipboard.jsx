import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SmallButton from '../Buttons/SmallButton';

const CopyClipboard = ({ formId }) => {
  const [textToCopy, setTextToCopy] = useState('');

  useEffect(() => {
    if (formId) {
      setTextToCopy(`${location.host}/responseform/${formId}`);
    }
  }, [formId]);

  return (
    <div className='flex flex-row border-2 z-50 items-center rounded-2xl w-full'>
      <p className='p-2 overflow-hidden overflow-ellipsis whitespace-nowrap flex-grow'>{textToCopy}</p>
      <CopyToClipboard text={textToCopy}>
        <SmallButton text='Copy' className='text-md' />
        {/* <button className='p-4 border-l-2 bg-azure rounded-r-md hover:bg-blue-700'>Copy</button> */}
      </CopyToClipboard>
    </div>
  );
};

export default CopyClipboard;
