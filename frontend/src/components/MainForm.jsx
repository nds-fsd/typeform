import React, { useState } from 'react';
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import Form4 from './Form4';

const MainForm = () => {
  const [expandedForm, setExpandedForm] = useState(null);
  const toggleForm = (index) => {
    if (expandedForm === index) {
      setExpandedForm(null);
    } else {
      setExpandedForm(index);
    }
  };

  return (
    <div>
      <h1>Forms</h1>
      <div className='main-form-container' onClick={() => toggleForm(1)}>
        Form1
      </div>
      <div className='main-form-container' onClick={() => toggleForm(2)}>
        Form2
      </div>
      <div className='main-form-container' onClick={() => toggleForm(3)}>
        Form3
      </div>
      <div className='main-form-container' onClick={() => toggleForm(4)}>
        Form4
      </div>
      {expandedForm === 1 && <Form1 />}
      {expandedForm === 2 && <Form2 />}
      {expandedForm === 3 && <Form3 />}
      {expandedForm === 4 && <Form4 />}
    </div>
  );
};

export default MainForm;
