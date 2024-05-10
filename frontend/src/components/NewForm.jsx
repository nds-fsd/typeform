import React, { useState } from 'react';

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
      <form className='newFormContainer' onSubmit={handleSubmit}>
        <p>My workspace - New Form</p>

        <input
          className='inputfFormName'
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
          </div>
        ))}
        <button type='button' className='addQuestionBtn' onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type='submit' style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
          Save
        </button>
      </form>
    </div>
  );
};

export default NewForm;
