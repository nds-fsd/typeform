import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../utils/api';
import style from './FormAnswers.module.css';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import { questionTypes } from '../../constants/questionTypes.jsx';
import AnswerCard from './AnswerCard.jsx';

const FormAnswers = () => {
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

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

  return (
    <div className={'flex flex-col h-screen w-screen bg-custom-gradient bg-contain overflow-scroll'}>
      <UserNavbar />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {answers.length > 0 ? (
        answers.map((answerSet, index) => (
          <AnswerCard answerSet={answerSet} index={index} />
        ))
      ) : (
        <p>No answers to display</p>
      )}
    </div>
  );
};

export default FormAnswers;
