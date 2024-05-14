import React, { useState } from 'react';
import styles from './NewForm.module.css';

const NewForm = () => {
  const [questions, setQuestions] = useState([{ question: '' }]);
  const [formName, setFormName] = useState('');

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '' }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', questions);
    console.log('Form Name:', formName);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <h1>Route / New Form</h1>
      <p>My workspace</p>
      <form className={styles.newFormContainer} onSubmit={handleSubmit}>
        <p>My workspace - New Form</p>

        <input
          className={styles.inputfFormName}
          type='text'
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          placeholder='Form Name'
          style={{ marginBottom: '10px' }}
        />

        {questions.map((question, index) => (
          <div key={index}>
            <label htmlFor={`question-${index}`}></label>
            <input
              type='text'
              id={`question-${index}`}
              name='question'
              value={question.question}
              onChange={(event) => handleChange(index, event)}
              placeholder='Whats your name?'
            />
            <br />
            <div key={index}>
              <label htmlFor={`question-${index}`}></label>
              <input
                type='text'
                id={`question-${index}`}
                name='question'
                value={question.question}
                onChange={(event) => handleChange(index, event)}
                placeholder='Whats your age?'
              />

              <br />
            </div>
          </div>
        ))}
        <button type='button' className={styles.addQuestionBtn} onClick={handleAddQuestion}>
          Add Question +
        </button>
      </form>
    </div>
  );
};

export default NewForm;
