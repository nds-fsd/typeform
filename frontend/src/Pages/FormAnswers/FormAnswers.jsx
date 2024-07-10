import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../utils/api';
import style from './FormAnswers.module.css';

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
    <div className={style.screen}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {answers.length > 0 ? (
        answers.map((answerSet, index) => (
          <div key={index} className={style.container}>
            <h1>{answerSet.form.title}</h1>
            {answerSet.answers.map((answerSet, index) => (
              <div key={index} className={style.cardContainer}>
                <h2>{answerSet.question.title}</h2>
                <div>{answerSet.answer}</div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No answers to display</p>
      )}
    </div>
  );
};

export default FormAnswers;
