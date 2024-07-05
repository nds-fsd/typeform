import React from 'react';

const RenderQuestion = ({ question, index, register, style }) => {
  if (!question) return null;

  switch (question.type) {
    case 'TextQuestion':
      return (
        <div className='max-w-6xl flex flex-col' key={question._id}>
          <label className='text-4xl font-semibold mb-2'>{question.text}</label>
          <p className='text-2xl max-w-6xl font-medium'>{question.description}</p>
          <textarea
            className='w-full p-2 border border-gray-300 rounded my-8 h-auto resize-none z-50 '
            {...register(`questions.${index}.answer`, { required: true })}
          />
        </div>
      );
    case 'SingleChoiceQuestion':
      return (
        <div className='max-w-6xl flex flex-col' key={question._id}>
          <label className='font text-4xl font-semibold mb-2'>{question.text}</label>
          <p className='text-2xl max-w-6xl font-medium'>{question.description}</p>
          <div className='flex flex-row flex wrap content-between justify-around mt-10 z-50'>
            {question.choices.map((option) => (
              <div key={option._id}>
                <input
                  type='radio'
                  className='text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 focus:bg-indigo-600 focus:text-white hover:bg-neutral-100'
                  id={option._id}
                  value={option.label}
                  {...register(`questions.${index}.answer`, { required: true })}
                />
                <label htmlFor={option._id}>{option.label}</label>
              </div>
            ))}
          </div>
        </div>
      );
    case 'MultipleChoiceQuestion':
      return (
        <div className='max-w-6xl flex flex-col' key={question._id}>
          <label className='text-4xl font-semibold mb-2'>{question.text}</label>
          <p className='text-2xl max-w-6xl font-medium'>{question.description}</p>
          <div className='flex flex-row flex wrap content-between justify-around mt-10 z-50'>
            {question.choices.map((option) => (
              <div key={option._id}>
                <input
                  type='checkbox'
                  id={option._id}
                  className='text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 focus:bg-indigo-600 focus:text-white hover:bg-neutral-100'
                  value={option.label}
                  {...register(`questions.${index}.answer`, { required: true })}
                />
                <label htmlFor={option._id}>{option.label}</label>
              </div>
            ))}
          </div>
        </div>
      );
    case 'YesNoQuestion':
      return (
        <div className='max-w-6xl flex flex-col' key={question._id}>
          <label className='text-4xl font-semibold mb-2'>{question.text}</label>
          <p className='text-2xl max-w-6xl font-medium'>{question.description}</p>
          <div className='flex flex-row flex-wrap content-between justify-around mt-10 z-50'>
            <div>
              <input
                type='radio'
                id={`${question._id}-yes`}
                className='text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 focus:bg-indigo-600 focus:text-white hover:bg-neutral-100'
                value='Yes'
                {...register(`questions.${index}.answer`, { required: true })}
              />
              <label htmlFor={`${question._id}-yes`}>Yes</label>
            </div>
            <div>
              <input
                type='radio'
                id={`${question._id}-no`}
                className='text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 focus:bg-indigo-600 focus:text-white hover:bg-neutral-100'
                value='No'
                {...register(`questions.${index}.answer`, { required: true })}
              />
              <label htmlFor={`${question._id}-no`}>No</label>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default RenderQuestion;

// case 'YesNoQuestion':
//       return (
//         <div className='max-w-6xl flex flex-col' key={question._id}>
//           <label className='text-4xl font-semibold mb-2'>{question.text}</label>
//           <p className='text-2xl max-w-6xl font-medium'>{question.description}</p>
//           <div className='flex flex-row flex wrap content-between justify-center my-16'>
//             <div className='mx-16 border border-blue-300 bg-blue-100 px-4 py-2 rounded-lg flex items-center cursor-pointer hover:bg-blue-200 z-50'>
//               <span className='border border-blue-300 w-6 h-6 flex items-center justify-center mr-2'>A</span>
//               <input
//                 type='radio'
//                 id={`${question._id}_yes`}
//                 className='opacity-0 absolute'
//                 value='Yes'
//                 {...register(`questions.${index}.answer`, { required: true })}
//               />
//               <label className='ml-2 cursor-pointer'>Yes</label>
//             </div>
//             <div className='mx-16 border border-blue-300 bg-blue-100 px-4 py-2 rounded-lg flex items-center cursor-pointer hover:bg-blue-200'>
//               <span className='border border-blue-300 w-6 h-6 flex items-center justify-center mr-2'>B</span>
//               <input
//                 type='radio'
//                 id={`${question._id}_no`}
//                 className='opacity-0 absolute'
//                 value='No'
//                 {...register(`questions.${index}.answer`, { required: true })}
//               />
//               <label className='ml-2 cursor-pointer'>No</label>
//             </div>
//           </div>
//         </div>
//       );
//     default:
//       return null;
//   }
