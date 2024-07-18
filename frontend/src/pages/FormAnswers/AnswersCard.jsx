import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../utils/api.js';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import { questionTypes } from '../../constants/questionTypes.jsx';

const AnswersCard = ({ answerSet, index }) => {
    return (
        <div key={index} className={'flex align-top m-2 p-8 bg-white/25 rounded-3xl w-fit'}>

            {answerSet.answers.map((answer, index) => {
                const questionType = questionTypes.find(
                    (questionType) => (questionType.value === answer.type));

                return (
                    <div key={index} className={'min-w-[500px] border-2 border-black p-4'}>
                        {questionType && (
                            <div>{questionType.icon}</div>
                        )}
                        <h1>{answer.question.title}</h1>
                        <p>{answer.answer}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default AnswersCard;