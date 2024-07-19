import React from 'react';
import { questionTypes } from '../../constants/questionTypes.jsx';

const AnswerCard = ({ answer }) => {
    const questionType = questionTypes.find(
        (questionType) => questionType.value === answer.type
    );

    return (
        <div className={'min-w-[500px] px-8 py-4  bg-white/20 rounded-xl'}>
            {questionType && (
                <div>{questionType.icon}</div>
            )}
            <p>{answer.answer}</p>
        </div>
    );
};

export default AnswerCard;
