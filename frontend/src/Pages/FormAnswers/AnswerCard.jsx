import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../utils/api';
import style from './FormAnswers.module.css';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import { questionTypes } from '../../constants/questionTypes.jsx';

const AnswerCard = ({ answerSet, index }) => {
    return (
        <div key={index} className={style.container}>
            <h1>{answerSet.form.title}</h1>
            <h2>{answerSet.creationDateTime}</h2>
            <div className={'flex'}>
                {answerSet.answers.map((answer, index) => {
                    const questionType = questionTypes.find(
                        (questionType) => (questionType.value === answer.type));

                    return (
                        <div key={index} className={style.cardContainer}>
                            {questionType && (
                                <div>{questionType.icon}</div>
                            )}
                            <h2>{answer.question.title}</h2>

                            <div>{answer.answer}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AnswerCard;
