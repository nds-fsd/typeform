import React, { useState } from 'react';

const NewForm = ({ onAddSubject }) => {
  const [forms, setForms] = useState([[{ answer: '', question: '' }]]);

  const handleChange = (formIndex, fieldIndex, event) => {
    const newForms = [...forms];
    newForms[formIndex][fieldIndex][event.target.name] = event.target.value;
    setForms(newForms);
  };

  const addNewField = (formIndex) => {
    const newForms = [...forms];
    newForms[formIndex].push({ answer: '', question: '' });
    setForms(newForms);
  };

  const handleSubmit = (formIndex) => {
    onAddSubject(forms[formIndex]);
    console.log('Form Data:', forms[formIndex]);
  };

  const addNewForm = () => {
    setForms([...forms, [{ answer: '', question: '' }]]);
  };

  return (
    <div>
      {forms.map((form, formIndex) => (
        <div key={formIndex} className='main-form-container'>
          <form>
            {form.map((field, fieldIndex) => (
              <div key={fieldIndex}>
                <label htmlFor={`field-${formIndex}-${fieldIndex}`}>{fieldIndex + 1}:</label>
                <input
                  type='text'
                  name='question'
                  value={field.question}
                  onChange={(event) => handleChange(formIndex, fieldIndex, event)}
                  placeholder='Enter question'
                  id={`field-${formIndex}-${fieldIndex}`}
                />
                <input
                  type='text'
                  name='answer'
                  value={field.answer}
                  onChange={(event) => handleChange(formIndex, fieldIndex, event)}
                  placeholder='Enter answer'
                />
              </div>
            ))}
            <button type='button' onClick={() => addNewField(formIndex)}>
              Add New question
            </button>
            <button type='button' onClick={() => handleSubmit(formIndex)}>
              Save
            </button>
          </form>
        </div>
      ))}
      <button type='button' onClick={addNewForm}>
        Create Form
      </button>
    </div>
  );
};

export default NewForm;
