const YesNoChoices = () => {
  return (
    <div className='flex gap-2 mt-4'>
      <div className='bg-orange-100 px-2 py-1 rounded-lg flex items-center'>
        <span className='bg-orange-200 w-6 rounded-lg w-6 h-6 flex items-center justify-center'>A</span>
        <input type='text' disabled className='outline-none bg-transparent pl-2' value='Yes' />
      </div>
      <div className='bg-orange-100 px-2 py-1 rounded-lg flex items-center'>
        <span className='bg-orange-200 w-6 rounded-lg h-6 flex items-center justify-center'>B</span>
        <input type='text' disabled className='outline-none bg-transparent pl-2' value='No' />
      </div>
    </div>
  );
};

export default YesNoChoices;
