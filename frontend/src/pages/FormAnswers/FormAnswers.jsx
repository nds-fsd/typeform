import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../utils/api';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import { questionTypes } from '../../constants/questionTypes.jsx';
import AnswerCard from './AnswerCard.jsx';
import { useParams } from 'react-router-dom';
import { useForms } from '../../hooks/useForms.js';
import { formatDate } from '../../utils/utils.js';

const FormAnswers = () => {
  const { forms, isLoading } = useForms();

  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  // get currentForm como origen de los datos question texts y type icons
  // para que aparezcan en el header o en la 1a columna de tabla de respuestas
  const formId = searchParams.getAll('form');
  // const { formId } = useParams();
  console.log(formId[0]);
  const currentForm = forms?.find((form) => form._id === formId[0]);

  useEffect(() => {
    const formId = searchParams.getAll('form');
    if (!formId) {
      setError('No form ID provided');
      return;
    }

    const fetchAnswers = async () => {
      try {
        const res = await api().get('/formAnswers', { params: { form: formId } });
        setAnswers(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch answers');
      }
    };

    fetchAnswers();
  }, [location]);
  //formTitle solo es necesario q aparezca una vez, en el header(?) */}

  const questionType = (question) => questionTypes.find(
    (questionType) => questionType.value === question?.type
  );

  return (
    <div className="flex flex-col h-screen w-screen bg-custom-gradient bg-contain overflow-scroll text-sm">
      <UserNavbar isCreateMode={false} />
      <div className="overflow-x-auto">
        {/* {error && <p className="text-red-500">{error}</p>} */}

        <table className="w-full border-separate border-t border-black border-spacing-0">
          <thead>
            <tr>
              <th className="border-b border-black text-left bg-white/30 px-20 font-normal">Date</th>
              {currentForm?.questions.map((question, index) => (
                <th key={index} className="border-b border-l border-black bg-white/30 py-4 text-left font-normal">
                  <div className='flex items-center gap-4 pl-4'>
                    {questionType(question).icon}
                    {question.text}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {answers.length > 0 ? (
              answers.map((answerSet, index) => (
                <tr key={index}>
                  {currentForm?.questions.map((question, qIndex) => (
                    <>
                      {qIndex === 0 &&
                        <td className="text-left pl-20 px-2 border-b border-black">{formatDate(answerSet.creationDateTime)}</td>
                      }
                      <td key={qIndex} className="border-b border-l pl-4 border-black">
                        <AnswerCard answer={answerSet.answers[qIndex]} />
                      </td>
                    </>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={currentForm?.questions.length + 1} className="border-black py-8 text-center">No answers to display</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div >
  );
};

export default FormAnswers;