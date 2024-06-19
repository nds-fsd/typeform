import React from 'react';

const RenderQuestion = ({ question, index, register, style }) => {
  if (!question) return null;

  switch (question.type) {
    case 'TextQuestion':
      return (
        <div className={style.question} key={question._id}>
          <label>{question.text}</label>
          <p>{question.description}</p>
          <input type='text' {...register(`questions.${index}.answer`, { required: true })} />
        </div>
      );
    case 'SingleChoiceQuestion':
      return (
        <div className={style.question} key={question._id}>
          <label>{question.text}</label>
          <p>{question.description}</p>
          <div className={style.choices}>
            {question.choices.map((option) => (
              <div key={option._id}>
                <input
                  type='radio'
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
        <div className={style.question} key={question._id}>
          <label>{question.text}</label>
          <p>{question.description}</p>
          <div className={style.choices}>
            {question.choices.map((option) => (
              <div key={option._id}>
                <input
                  type='checkbox'
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
    case 'YesNoQuestion':
      return (
        <div className={style.question} key={question._id}>
          <label>{question.text}</label>
          <p>{question.description}</p>
          <div className={style.choices}>
            {question.choices.map((option) => (
              <div key={option._id}>
                <input
                  type='radio'
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
    default:
      return null;
  }
};

export default RenderQuestion;
