import React from 'react';
import { questionTypes } from '../../constants/questionTypes.jsx';

const AnswerCard = ({ answer }) => {
    const questionType = questionTypes.find(
        (questionType) => questionType.value === answer.type
    );

    return (
        <div className={'min-w-[500px] p-4'}>
            {questionType && (
                <div>{questionType.icon}</div>
            )}
            <p>{answer.answer}</p>
        </div>
    );
};

export default AnswerCard;
