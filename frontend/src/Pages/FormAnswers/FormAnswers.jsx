import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../utils/api';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import { questionTypes } from '../../constants/questionTypes.jsx';
import AnswerCard from './AnswerCard.jsx';
import { useParams } from 'react-router-dom';
import { useForms } from '../../hooks/useForms.js';

const FormAnswers = () => {
  const { forms, isLoading } = useForms();

  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  // get currentForm como origen de los datos question texts y type icons 
  // para que aparezcan en el header o en la 1a columna de tabla de respuestas
  const formId = searchParams.getAll('form');
  // const { formId } = useParams();
  console.log(formId[0])
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

  return (
    <div className={'flex flex-col h-screen w-screen bg-custom-gradient bg-contain overflow-scroll'}>
      <UserNavbar />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>DATE</th>
            {currentForm?.questions.map((question, index) => (
              <th key={index}>{question.type}{question.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {answers.length > 0 ? (
            answers.map((answerSet, index) => (
              <tr key={index}>
                <td>{answerSet.creationDateTime}</td>
                {currentForm?.questions.map((question, qIndex) => (
                  <td key={qIndex}>
                    <AnswerCard answer={answerSet.answers[qIndex]} />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={currentForm?.questions.length + 1}>No answers to display</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FormAnswers;
