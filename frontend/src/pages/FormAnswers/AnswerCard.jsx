import React from 'react';
import { questionTypes } from '../../constants/questionTypes.jsx';

const AnswerCard = ({ answer }) => {
    const questionType = questionTypes.find(
        (questionType) => questionType.value === answer.type
    );

    return (
        <div className={'w-full text-sm'}>
            <p>{answer.answer}</p>
        </div>
    );
};

export default AnswerCard;
